const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const router = express.Router();

/**
 * @swagger
 * /usuarios/cadastrar-usuario:
 *   post:
 *     summary: Cadastra um novo usuário
 *     description: Cria um usuário novo na plataforma, validando renda per capita.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *               renda:
 *                 type: number
 *                 example: 1200
 *               pessoasMorando:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário já existe
 *       403:
 *         description: Renda per capita acima do permitido
 *       500:
 *         description: Erro interno ao cadastrar o usuário
 */
router.post("/cadastrar-usuario", async (req, res) => {
    const { nome, email, senha, renda, pessoasMorando } = req.body; // Dados recebidos do front-end

    // Verificando se todos os campos necessários foram preenchidos
    if (!nome || !email || !senha || !renda || !pessoasMorando) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    // Validação de renda per capita
    const rendaPerCapita = parseFloat(renda) / parseInt(pessoasMorando, 10);
    if (rendaPerCapita > 1500) {
        return res.status(403).json({
            erro: "Cadastro não aprovado",
            mensagem: "Nossa proposta é social e prioriza pessoas com renda per capita até R$1500. Seu cadastro não foi aprovado pois sua renda é superior a esse limite."
        });
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

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login de usuário
 *     description: Realiza o login de um usuário e retorna um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Email e senha são obrigatórios
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao realizar login
 */
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
