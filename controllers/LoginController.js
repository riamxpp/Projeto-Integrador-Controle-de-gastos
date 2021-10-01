const Acesso = require('../models/db');

class LoginControllers {
    login(req, res){
        res.render('pages/login');
    }
    async captura(req, res){
        let user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        if(!await Acesso.verifSenhaLogin(user.email, user.senha)){
            return res.render('pages/login', { erro: 'Email ou senha não corresponde!'});
        }
        // if(!await Acesso.verifEmail(user.email)){
        //     return res.render('pages/login', { erro: 'Nenhum usuário cadastrado com esse email!'});
        // }

        // if(!await Acesso.verifSenhaLogin(user.senha)){
        //     return res.render('pages/login', { erro: 'Nenhum usuário cadastrado com essa senha!'});
        // }
        req.session.logado = true

        return res.redirect('/home');
    }
}

module.exports = new LoginControllers();