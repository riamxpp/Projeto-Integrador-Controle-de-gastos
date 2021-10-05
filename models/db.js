const User = require('./user');
const Receitas = require('./receitas');


//Caso a tabela não exista no meu bd o sync() irá criar.
// User.sync();
// Receitas.sync();

class Acesso { 
    async createUsers(user){
        await User.create(user);
    }
    async createReceitas(value){
        await Receitas.create(value);
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
            const id = await User.findOne({
                where: {
                    email: email,
                    senha: senha
                }
            })
            if(Object.keys(id).length === 0){
                return false
            }
            
            return true 
        }catch(err) {   
            console.log(err);
        }
    }   
    async retornandoID(email){
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            return user.dataValues.id
        }catch(erro){
            console.log('Erro: ' + erro);
        }
    }
    async retornandoUser(email){
        try {
            const nome = await User.findOne({
                 where: {
                     email: email
                 }
             })

             return nome.dataValues.nome;
        }catch(erro){
            console.log('Erro: ' + erro);
        }
    }
    async retornandoTotal(id){
        try {
            const total = await Receitas.findOne({
                where: {
                    userId: id
                }
            })
       
            return total.dataValues.valorReceita
        }catch(erro){
            console.log('Erro: '+ erro);
        }
    }
}


module.exports = new Acesso();