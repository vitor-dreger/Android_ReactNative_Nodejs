const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Avaliacao = sequelize.define("Avaliacao", {
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_livro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Avaliacao;