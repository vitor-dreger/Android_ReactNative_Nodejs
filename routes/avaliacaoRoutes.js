const express = require("express");
const Avaliacao = require("../models/Avaliacao");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /avaliacoes/cadastrar:
 *   post:
 *     summary: Cadastra uma nova avaliação
 *     description: Cadastra uma avaliação para um livro. Requer autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 5
 *               comentario:
 *                 type: string
 *                 example: Livro excelente!
 *               id_livro:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Avaliação cadastrada com sucesso
 *       400:
 *         description: Nota e ID do livro são obrigatórios ou nota fora do intervalo
 *       500:
 *         description: Erro interno ao cadastrar avaliação
 */

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
/**
 * @swagger
 * /avaliacoes/{id_livro}:
 *   get:
 *     summary: Lista avaliações de um livro
 *     description: Retorna todas as avaliações de um livro pelo ID. Requer autenticação.
 *     parameters:
 *       - in: path
 *         name: id_livro
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *       404:
 *         description: Nenhuma avaliação encontrada para este livro
 *       500:
 *         description: Erro interno ao buscar avaliações
 */
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
/**
 * @swagger
 * /avaliacoes/atualizar/{id}:
 *   put:
 *     summary: Atualiza uma avaliação
 *     description: Atualiza a nota e/ou comentário de uma avaliação do usuário autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: integer
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: Gostei bastante!
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Nota fora do intervalo permitido
 *       404:
 *         description: Avaliação não encontrada ou sem permissão
 *       500:
 *         description: Erro interno ao atualizar avaliação
 */
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
/**
 * @swagger
 * /avaliacoes/excluir/{id}:
 *   delete:
 *     summary: Exclui uma avaliação
 *     description: Exclui uma avaliação do usuário autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação excluída com sucesso
 *       404:
 *         description: Avaliação não encontrada ou sem permissão
 *       500:
 *         description: Erro interno ao excluir avaliação
 */
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