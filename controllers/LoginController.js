const Acesso = require('../models/db');

class LoginControllers {
    login(req, res){
        if(req.session.logado)
            res.render('pages/home');
        else 
            res.render('pages/login');
    }
    async captura(req, res){
        let user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        if(req.body.email === '' && req.body.senha === ''){
            return res.render('pages/login', { erro: 'Nenhum campo pode ficar vazio!'});
       }
        if(!await Acesso.verifSenhaLogin(user.email, user.senha)){
            return res.render('pages/login', { erro: 'Email ou senha não corresponde!'});
        }
      
        req.session.logado = true

        return res.redirect('/home');
    }
    logout(req, res){ 
        req.session.logado = false
        return res.redirect('/login');
    }
}

module.exports = new LoginControllers();