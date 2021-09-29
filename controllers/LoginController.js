const Acesso = require('../models/db');

class LoginControllers {
    login(req, res){
        res.render('pages/login');
    }
    home(req, res){
        let user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        if(Acesso.loginEmail(user.email)){
            return res.render('pages/login');
        }


        return res.redirect('pages/home');
    }
}

module.exports = new LoginControllers();