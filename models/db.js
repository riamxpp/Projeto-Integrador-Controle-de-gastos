const Sequelize = require('sequelize');
const conexao = require('./Conexao');
// const { QueryTypes } = require('sequelize');

const User = conexao.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, //auto incremente, ex: se o usuario passado foi 1 o proximo é 2
        allowNull: false, //não pode ser null
        primaryKey: true //chave primaria
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
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
        const user = await User.findOne({ 
            where: {
                email: value
            }
        })
        // console.log(user);
        if(!user){
            // console.log('email n existe');
            return true;
        }
            
        return false;
        // console.log(user.dataValues.email);
    }
    // async verifSenha(senha){
    //     const user = await conexao.findOne({
    //         where: {
    //             senha: senha
    //         }
    //     })
    //     // if(user === null) return true;

    //     if(user === null) 
    //         return true
       
    //     return user
    // }
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