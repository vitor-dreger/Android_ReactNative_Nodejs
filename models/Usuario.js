const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // importa a conexão

const Usuario = sequelize.define("Usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // não permite e-mails repetidos
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  renda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pessoasMorando: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Usuario;
