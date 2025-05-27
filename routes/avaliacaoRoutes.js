const express = require("express");
const Avaliacao = require("../models/Avaliacao");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/cadastrar", authMiddleware, async (req, res) => {
    const { nota, comentario, id_livro } = req.body;

    if (!nota || !id_livro) {
        return res.status(400).json({ erro: "Nota e ID do livro são obrigatórios" });
    }

    if (nota < 1 || nota > 5) {
        return res.status(400).json({ erro: "A nota deve estar entre 1 e 5" });
    }

    try {
        const novaAvaliacao = await Avaliacao.create({
            nota,
            comentario,
            id_usuario: req.user.id,
            id_livro,
        });

        res.status(201).json({ mensagem: "Avaliação cadastrada com sucesso", avaliacao: novaAvaliacao });
    } catch (error) {
        console.error("Erro ao cadastrar avaliação:", error);
        res.status(500).json({ erro: "Erro interno ao cadastrar avaliação" });
    }
});

module.exports = router;