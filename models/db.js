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
        await User.findOne({ 
            where: {
                email: value
            }
        }).then(res => {
            if(res == null){
                console.log('entrou no if');
                return false
            }
            // console.log(res);
            return true
        })
    }
    async loginEmail(email){
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(user === null) 
            return true
        
        return false
    }
}


module.exports = new Acessos();