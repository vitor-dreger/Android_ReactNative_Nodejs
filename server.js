// =====================
// CONFIGURAÇÕES INICIAIS
// =====================
require("dotenv").config(); // Carrega variáveis do .env

const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize");
// ✅ Importa APENAS o swaggerSpec do arquivo swagger.js
const { swaggerSpec } = require("./swagger");
// ✅ Importa swaggerUi diretamente aqui, se ainda não estiver
const swaggerUi = require('swagger-ui-express');


const usuarioRoutes = require("./routes/usuarioRoutes");
const livroRoutes = require("./routes/livroRoutes");
const avaliacaoRoutes = require("./routes/avaliacaoRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// =====================
// SWAGGER (MUDANÇA CRÍTICA AQUI!)
// =====================

// >> REMOVA A ROTA app.get('/swagger.json', ...) SE VOCÊ ADICIONOU ELA ANTES <<
// Não precisaremos dela se passarmos a especificação diretamente.

// >> PASSO ÚNICO E MAIS SIMPLES: Configure o Swagger UI passando o objeto swaggerSpec DIRETAMENTE <<
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Passa o objeto completo aqui!


// =====================
// ROTAS
// =====================
app.use("/usuarios", usuarioRoutes);
app.use("/livros", livroRoutes);
app.use("/avaliacoes", avaliacaoRoutes);

// =====================
// SERVER
// =====================
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Conexão com o MySQL estabelecida com sucesso.");

    app.listen(5000, () => {
      console.log("Servidor rodando na porta 5000");
      console.log("Swagger disponível em: http://localhost:5000/api-docs ✅");
    });
  } catch (err) {
    console.error("Não foi possível conectar ao MySQL:", err);
  }
};

startServer();