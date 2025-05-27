const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

        // Retorna uma resposta de sucesso sem a senha
        const { senha: senhaOculta, ...usuarioSemSenha } = novoUsuario.toJSON();
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", usuario: usuarioSemSenha });

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).json({ erro: "Erro interno ao cadastrar o usuário" });
    }
});

// Rota para login de usuário
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    // Verifica se os campos foram enviados
    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        // Verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: "Senha inválida" });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET, // Certifique-se de que JWT_SECRET está definido no .env
            { expiresIn: "1h" }
        );

        res.json({ mensagem: "Login realizado com sucesso", token });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        res.status(500).json({ erro: "Erro interno ao realizar login" });
    }
});

module.exports = router;
