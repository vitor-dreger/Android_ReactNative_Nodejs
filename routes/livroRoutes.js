const express = require("express");
const axios = require("axios");
const Livro = require("../models/Livro");
const { Op } = require("sequelize"); // Importa operadores do Sequelize
const authMiddleware = require("../middlewares/authMiddleware"); // Importa o middleware de autenticação
const router = express.Router();

// Rota para buscar livros da API do Google Books e salvar no banco
router.post("/salvar-livros", async (req, res) => {
    const { titulo } = req.body;

    if (!titulo) {
        return res.status(400).json({ erro: "Informe um título para buscar os livros" });
    }

    try {
        // Busca os livros na API do Google Books
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titulo}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        const livros = response.data.items;

        if (!livros || livros.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum livro encontrado na API do Google Books" });
        }

        // Salva os livros no banco de dados
        const livrosSalvos = [];
        for (const item of livros) {
            const info = item.volumeInfo;

            // Verifica se o livro já existe no banco
            const livroExistente = await Livro.findOne({ where: { titulo: info.title } });
            if (livroExistente) {
                console.log(`Livro já existe: ${info.title}`);
                continue; // Pula para o próximo livro
            }

            const livro = await Livro.create({
                titulo: info.title,
                descricao: info.description || "Sem descrição",
                autor: info.authors ? info.authors.join(", ") : "Autor desconhecido",
                imagem: info.imageLinks?.thumbnail || null,
                tipo: "api", // Identifica que o livro veio da API
            });

            livrosSalvos.push(livro);
        }

        res.status(201).json({ mensagem: "Livros salvos com sucesso", livros: livrosSalvos });
    } catch (error) {
        console.error("Erro ao salvar livros:", error);
        res.status(500).json({ erro: "Erro interno ao salvar livros" });
    }
});

// Rota para listar livros com paginação e filtros
router.get("/listar", authMiddleware, async (req, res) => {
    const { page = 1, limit = 10, titulo, autor, tipo, meusLivros } = req.query; // Adiciona filtro "meusLivros"
    const offset = (page - 1) * limit;

    const where = {};
    if (titulo) where.titulo = { [Op.like]: `%${titulo}%` }; // Filtro por título (contém)
    if (autor) where.autor = { [Op.like]: `%${autor}%` }; // Filtro por autor (contém)
    if (tipo) where.tipo = tipo; // Filtro por tipo (igualdade exata)
    if (meusLivros === "true") where.id_usuario = req.user.id; // Filtra pelos livros do usuário autenticado

    try {
        const livros = await Livro.findAndCountAll({
            where, // Aplica os filtros
            limit: parseInt(limit), // Limita o número de registros por página
            offset: parseInt(offset), // Define o deslocamento com base na página
        });

        res.json({
            total: livros.count, // Total de livros no banco
            paginas: Math.ceil(livros.count / limit), // Total de páginas
            livros: livros.rows, // Livros da página atual
        });
    } catch (error) {
        console.error("Erro ao listar livros com filtros:", error);
        res.status(500).json({ erro: "Erro interno ao listar livros" });
    }
});

// Rota para cadastrar um livro manualmente
router.post("/cadastrar", authMiddleware, async (req, res) => {
    const { titulo, descricao, autor, imagem, tipo } = req.body;

    if (!titulo || !tipo) {
        return res.status(400).json({ erro: "Título e tipo são obrigatórios" });
    }

    try {
        const novoLivro = await Livro.create({
            titulo,
            descricao,
            autor,
            imagem,
            tipo,
            id_usuario: req.user.id, // Associa o livro ao usuário autenticado
        });

        res.status(201).json({ mensagem: "Livro cadastrado com sucesso", livro: novoLivro });
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error);
        res.status(500).json({ erro: "Erro interno ao cadastrar livro" });
    }
});

// Rota para listar todos os livros sem paginação
router.get("/todos", async (req, res) => {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
    } catch (error) {
        console.error("Erro ao listar todos os livros:", error);
        res.status(500).json({ erro: "Erro interno ao listar todos os livros" });
    }
});

module.exports = router;
