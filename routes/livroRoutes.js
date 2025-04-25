const express = require('express');
const axios = require('axios');
const router = express.Router(); // Cria o router para as rotas

// =======================
// ROTA: /buscar-livros - API do Google Books
// =======================
router.get("/buscar-livros", async (req, res) => {
    const { titulo } = req.query;

    // Verifica se o titulo foi enviado na URL
    if (!titulo) {
        return res.status(400).json({ erro: "Informe um título para a busca" });
    }

    try {
        // Requisição à API
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titulo}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);

        // Filtra e "simplifica" os dados recebidos da API
        const livrosSimplificados = response.data.items.map(item => {
            const info = item.volumeInfo;

            return {
                titulo: info.title,
                autores: info.authors,
                descricao: info.description,
                imagem: info.imageLinks?.thumbnail,
                link: info.previewLink,
                editora: info.publisher,
                categorias: info.categories
            };
        });

        // Envia os dados simplificados como resposta
        res.json(livrosSimplificados);

    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros" });
    }
});

module.exports = router; // Exporta o router
