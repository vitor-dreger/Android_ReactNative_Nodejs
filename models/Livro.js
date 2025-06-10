const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Livro = sequelize.define("Livro", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true, // Pode ser null para livros da API
    },
});

module.exports = Livro;