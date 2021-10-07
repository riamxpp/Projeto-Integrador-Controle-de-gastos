const { addListener } = require('nodemon');
const Acesso = require('../models/db');

class CadastroController {
    cadastro(req, res){
        if(req.session.logado)
            res.render('pages/home');
        else 
            res.render('pages/cadastro');
    }
    async captura(req, res){
        let user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        if(req.body.nome === '' && req.body.email === '' && req.body.senha === ''){
                return res.render('pages/cadastro', { erro: 'Preencha os campos correntamente!'});
        }
        if(await Acesso.verifEmail(user.email)){
            return res.render('pages/cadastro', { erro: 'Email já cadastrado' });
        }
        await Acesso.createUsers(user);

        const id = await Acesso.retornandoID(user.email)
        .then(resolver => resolver)

        const total = await Acesso.retornandoTotalReceita(id)
        .then(resolver => resolver);
        
        req.session.logado = true
        req.session.dadosUser = {
            email: req.body.email,
            nome: req.body.nome,
            id: id,
            total: total
        }
       
        res.redirect('/home');
    }
}

module.exports = new CadastroController()