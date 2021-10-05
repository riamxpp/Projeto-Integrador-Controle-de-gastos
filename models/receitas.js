const conexao = require('./Conexao');
const { Sequelize, DataTypes } = require('sequelize');

const Receitas = conexao.define('receitas', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  valorReceita: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  categoriaReceita: {
      type: DataTypes.STRING,
  },
  valorDispesa: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  categoriaDispesa: {
      type: DataTypes.STRING,
  }
});




module.exports = Receitas;