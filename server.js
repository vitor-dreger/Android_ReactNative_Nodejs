// =====================
// CONFIGURAÇÕES INICIAIS
// =====================
require("dotenv").config(); // Carrega variáveis do .env

const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize"); // Conexão com o banco

const app = express();
app.use(express.json());
app.use(cors());

// =====================
// ROTAS
// =====================
const livroRoutes = require("./routes/livroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use("/livros", livroRoutes);     // Ex: GET /livros/buscar-livros
app.use("/usuarios", usuarioRoutes); // Ex: POST /usuarios/cadastrar-usuario

// =====================
// INICIA O SERVIDOR
// =====================
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true }); // Atualiza as tabelas conforme os modelos
    console.log("Conexão com o MySQL estabelecida com sucesso.");

    app.listen(5000, () => {
      console.log("Servidor rodando na porta 5000");
    });

  } catch (err) {
    console.error("Não foi possível conectar ao MySQL:", err);
  }
};

startServer();
