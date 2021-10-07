const Acesso = require('../models/db');
class HomeController {
    async home(req, res){
        if(req.session.logado){
            const dadosUsuarios = req.session.dadosUser;

            const totalReceita = await Acesso.retornandoTotalReceita(dadosUsuarios.id)
            .then(resolver => resolver);
            const totalDispesa = await Acesso.retornandoTotalDispesa(dadosUsuarios.id)
            .then(resolver => resolver);
            
            let total = totalReceita - totalDispesa;
            dadosUsuarios.total = total

            res.render('pages/home', { dadosUsuarios });
        }else {
            res.redirect('/login');
        }
    }
    async dadosUser(req, res){
        try {
            const infoUsers = req.session.dadosUser;

            const id = await Acesso.retornandoID(infoUsers.email)
            .then(resolver => resolver)
            if(req.body.categoriaDispesa === '' && req.body.valorDispesa === ''){
                req.body.categoriaDispesa = 'Sem dispesa'
                req.body.valorDispesa = 0
            }else if(req.body.categoriaReceita === '' && req.body.valorReceita === ''){
                req.body.categoriaReceita = 'Sem receita'
                req.body.valorReceita = 0
            }
            const receitaAndDispesa = {
                valorReceita: req.body.valorReceita,
                categoriaReceita: req.body.categoriaReceita,
                valorDispesa: req.body.valorDispesa,
                categoriaDispesa: req.body.categoriaDispesa,
                userId: id
            }

            let totalReceita = await Acesso.retornandoTotalReceita(id)
            .then(resolver => resolver);
            let totalDispesa = await Acesso.retornandoTotalDispesa(id)
            .then(resolver => resolver);
            let total = totalReceita - totalDispesa;

            req.session.dadosUser = {
                email: infoUsers.email,
                nome: infoUsers.nome,
                id: id,
                total: total
            }
            
            await Acesso.createReceitas(receitaAndDispesa);
            res.redirect('/home');
        }catch(err){
            console.log('Erro: ', err);
        }
        
    }
}


module.exports = new HomeController();