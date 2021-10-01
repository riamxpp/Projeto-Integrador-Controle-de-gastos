const { Sequelize, DataTypes } = require('sequelize');
const conexao = require('./Conexao');
// const { QueryTypes } = require('sequelize');

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
//Caso a tabela não exista no meu bd o sync() irá criar.
// User.sync();

// user instanceof User

class Acessos { 
    async createUsers(user){
        await User.create(user)
    }
    async verifEmail(value){ 
        try {
            const res = await User.findOne({ 
                where: {
                    email: value
                }
            });
                if(res === null){
                    return false
                }

                return true
        }catch(err) {
            console.log('Erro ', err)
        }
    }
    async verifSenhaLogin(email, senha){
        try {
            const id = await User.findAll({
                where: {
                    email: email,
                    senha: senha
                }
            })
            // console.log(id, ' aqui');
            if(Object.keys(id).length === 0){
                return false
            }

            return true 
        }catch(err) {   
            console.log(err);
        }
    }
}


module.exports = new Acessos();