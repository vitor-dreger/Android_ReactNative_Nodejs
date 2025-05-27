// =====================
// CONFIGURAÇÕES INICIAIS
// =====================
require("dotenv").config(); // Carrega variáveis do .env

const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize"); // Conexão com o banco

const usuarioRoutes = require("./routes/usuarioRoutes"); // Importa as rotas de usuário
const livroRoutes = require("./routes/livroRoutes"); // Importa as rotas de livros
const avaliacaoRoutes = require("./routes/avaliacaoRoutes"); // Importa as rotas de avaliação

const app = express();
app.use(express.json());
app.use(cors());

// Registra as rotas
app.use("/usuarios", usuarioRoutes); // Rotas de usuário
app.use("/livros", livroRoutes);     // Rotas de livros
app.use("/avaliacoes", avaliacaoRoutes); // Registra as rotas com o prefixo "/avaliacoes"

// Inicia o servidor
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Conexão com o MySQL estabelecida com sucesso.");

    app.listen(5000, () => {
      console.log("Servidor rodando na porta 5000");
    });
  } catch (err) {
    console.error("Não foi possível conectar ao MySQL:", err);
  }
};

startServer();