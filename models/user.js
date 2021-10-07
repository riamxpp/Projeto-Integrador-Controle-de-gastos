const conexao = require('./Conexao');
const { Sequelize, DataTypes } = require('sequelize');
const Receitas = require('./receitas');

const User = conexao.define('users', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      allowNull: false, 
      primaryKey: true 
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

Receitas.belongsTo(User)

User.hasMany(Receitas, {
    constraint: true,
    foreignKey: 'userId'
})
module.exports = User;