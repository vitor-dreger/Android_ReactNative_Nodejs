const express = require("express");
const Avaliacao = require("../models/Avaliacao");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Rota para cadastrar uma nova avaliação
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

// Rota para listar avaliações de um livro
router.get("/:id_livro", authMiddleware, async (req, res) => {
    try {
        const avaliacoes = await Avaliacao.findAll({
            where: { id_livro: req.params.id_livro },
        });

        if (!avaliacoes || avaliacoes.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma avaliação encontrada para este livro" });
        }

        res.json(avaliacoes);
    } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        res.status(500).json({ erro: "Erro interno ao buscar avaliações" });
    }
});

// Rota para atualizar uma avaliação
router.put("/atualizar/:id", authMiddleware, async (req, res) => {
    const { nota, comentario } = req.body;

    if (nota && (nota < 1 || nota > 5)) {
        return res.status(400).json({ erro: "A nota deve estar entre 1 e 5" });
    }

    try {
        const avaliacao = await Avaliacao.findOne({
            where: { id: req.params.id, id_usuario: req.user.id },
        });

        if (!avaliacao) {
            return res.status(404).json({ erro: "Avaliação não encontrada ou você não tem permissão para atualizá-la" });
        }

        avaliacao.nota = nota || avaliacao.nota;
        avaliacao.comentario = comentario || avaliacao.comentario;

        await avaliacao.save();

        res.json({ mensagem: "Avaliação atualizada com sucesso", avaliacao });
    } catch (error) {
        console.error("Erro ao atualizar avaliação:", error);
        res.status(500).json({ erro: "Erro interno ao atualizar avaliação" });
    }
});

// Rota para excluir uma avaliação
router.delete("/excluir/:id", authMiddleware, async (req, res) => {
    try {
        const avaliacao = await Avaliacao.findOne({
            where: { id: req.params.id, id_usuario: req.user.id },
        });

        if (!avaliacao) {
            return res.status(404).json({ erro: "Avaliação não encontrada ou você não tem permissão para excluí-la" });
        }

        await avaliacao.destroy();

        res.json({ mensagem: "Avaliação excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir avaliação:", error);
        res.status(500).json({ erro: "Erro interno ao excluir avaliação" });
    }
});

module.exports = router;