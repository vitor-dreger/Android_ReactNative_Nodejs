const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post("/cadastrar-usuario", async (req, res) => {
    const { nome, email, senha, renda, pessoasMorando } = req.body; // Dados recebidos do front-end

    // Verificando se todos os campos necessários foram preenchidos
    if (!nome || !email || !senha || !renda || !pessoasMorando) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    try {
        // Verificar se o email já existe no banco
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ erro: "Já existe um usuário com esse email" });
        }

        // Criptografando a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Criando o novo usuário
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            renda,
            pessoasMorando,
        });

        // Retorna uma resposta de sucesso
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: novoUsuario });

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ erro: "Erro interno ao cadastrar o usuário" });
    }
});

module.exports = router;
