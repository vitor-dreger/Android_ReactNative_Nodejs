// carregando as variaveis do ambiente .env
require("dotenv").config();

//importa os pacotes necessarios
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const axios = require("axios");

//inicia o app
const app = express();
app.use(express.json());
app.use(cors());

// conexão com o banco MySql usando Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});

// Teste de conexão com o banco
sequelize.authenticate()
    .then(() => console.log("Conexão com o MySQL estabelecida com sucesso."))
    .catch((err) => console.error("Não foi possível conectar ao MySQL:", err));

// =======================
// ROTA: /buscar-livros - API do Google Books
// =======================


app.get("/buscar-livros", async (req, res) => {
    const { titulo } = req.query;
    
//verifica se o titulo foi enviado na URL
    if (!titulo) {
        return res.status(400).json({ erro: "Informe um título para a busca" });
    }
    
    try {
        //req à API
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titulo}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        
        //filtra e "simplifica" os dados recebidos da API somente com o que nos queremos
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
        
        //envia os dados simplificados como resposta.
        res.json(livrosSimplificados);

    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros" });
    }
});

//inicia o server na porta 5000
app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});
