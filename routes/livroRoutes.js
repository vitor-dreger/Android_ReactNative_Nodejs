const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware para autenticação
const Livro = require("../models/Livro"); // Modelo do Sequelize
const router = express.Router();

// =======================
// ROTA: /buscar-livros - API do Google Books
// =======================
router.get("/buscar-livros", authMiddleware, async (req, res) => {
    const { titulo } = req.query;

    if (!titulo) {
        return res.status(400).json({ erro: "Informe um título para a busca" });
    }

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titulo}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        const livrosSimplificados = response.data.items.map(item => {
            const info = item.volumeInfo;

            return {
                titulo: info.title,
                autores: info.authors,
                descricao: info.description,
                imagem: info.imageLinks?.thumbnail,
                link: info.previewLink,
                editora: info.publisher,
                categorias: info.categories,
            };
        });

        res.json(livrosSimplificados);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros" });
    }
});

// =======================
// ROTA: /cadastrar - Cadastro de Livros
// =======================
router.post("/cadastrar", authMiddleware, async (req, res) => {
    const { titulo, descricao, autor, imagem, tipo } = req.body;

    if (!titulo || !descricao || !autor || !imagem || !tipo) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    try {
        const novoLivro = await Livro.create({
            titulo,
            descricao,
            autor,
            imagem,
            tipo,
            id_usuario: req.user.id, // ID do usuário autenticado
        });

        res.status(201).json({ mensagem: "Livro cadastrado com sucesso", livro: novoLivro });
    } catch (error) {
        console.error("Erro ao cadastrar livro:", error);
        res.status(500).json({ erro: "Erro interno ao cadastrar o livro" });
    }
});

module.exports = router;
