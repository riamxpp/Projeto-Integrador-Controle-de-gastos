const User = require('./user');
const Receitas = require('./receitas');
const _ = require('lodash');

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
            console.log('Erro: ', erro);
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
            console.log('Erro: ', erro);
        }
    }
    async retornandoTotalReceita(id){
        try {
            const total = await Receitas.findAll({
                where: {
                    userId: id
                }
            })
            if(total == null){
                return 0;
            }
            const arrayValores = []
            await _.forEach(total, item => {
                const valores = {
                    valorReceita: item.dataValues.valorReceita,
                }
                arrayValores.push(valores);
            });

            let totalReceita = 0
            await _.forEach(arrayValores, item => {
                totalReceita += item.valorReceita;
            })
          
            return totalReceita;
        }catch(erro){
            console.log('Erro: ', erro);
        }
    }
    async retornandoTotalDispesa(id){
        try {
            const total = await Receitas.findAll({
                where: {
                    userId: id
                }
            })
            if(total == null){
                return 0;
            }
            let valoresDispesa = [];
            _.forEach(total, item => {
                const valores = {
                    valorDispesa: item.dataValues.valorDispesa,
                }
                valoresDispesa.push(valores);
            })
            let totalDispesa = 0
            _.forEach(valoresDispesa, item => {
                totalDispesa += item.valorDispesa
            })

            return totalDispesa;
        }catch(erro){
            console.log('Erro: ', erro);
        }
    }
    async pegandoDados(id){
        const dados = await Receitas.findAll({
            where: {
                userId: id
            }
        })
        const meusDados = []
        _.forEach(dados, item => {
            let valores = {
                valorReceita: item.dataValues.valorReceita,
                categoriaReceita: item.dataValues.categoriaReceita,
                valorDispesa: item.dataValues.valorDispesa,
                categoriaDispesa: item.dataValues.categoriaDispesa,
                createdAt: item.dataValues.createdAt
            }
            meusDados.push(valores);
        })
        
        return meusDados;
    }
}


module.exports = new Acesso();