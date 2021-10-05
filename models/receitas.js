const conexao = require('./Conexao');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user');

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
//falando que minhas Receitas percente a um User
//Esse relacionamento vai criar um campo de User na Receitas.
// Receitas.belongsTo(User, {
//   constraint: true, //falando que quer chave estrangeira
//   foreignKey: 'idUser', //setando o nome, se n passar esse parâmetro ele vai criar um nome padrão
// })

User.hasMany(Receitas, {
    constraint: true,
})

module.exports = Receitas;