const conexao = require('./Conexao');
const { Sequelize, DataTypes } = require('sequelize');
const Receitas = require('./receitas');

const User = conexao.define('users', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, //auto incremente, ex: se o usuario passado foi 1 o proximo é 2
      allowNull: false, //não pode ser null
      primaryKey: true //chave primaria
  },
  nome: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  senha: {
      type: DataTypes.STRING,
      allowNull: false,
  }
});
//falando que minhas Receitas percente a um User
// Esse relacionamento vai criar um campo de User na Receitas.
Receitas.belongsTo(User)

User.hasMany(Receitas, {
    constraint: true,
    foreignKey: 'userId'
})
module.exports = User;