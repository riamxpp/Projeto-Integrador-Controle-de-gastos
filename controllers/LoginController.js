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
            return res.render('pages/login', { erro: 'Email ou senha não correspondem!'});
        }
      
        const nome = await Acesso.retornandoUser(user.email)
        .then(resolver => resolver);
        const id = await Acesso.retornandoID(user.email)
        .then(resolver => resolver);
        const totalReceita = await Acesso.retornandoTotalReceita(id)
        .then(resolver => resolver);
        const totalDispesa = await Acesso.retornandoTotalDispesa(id)
        .then(resolver => resolver);

        let total = totalReceita - totalDispesa;

        req.session.logado = true
        req.session.dadosUser = {
            email: user.email,
            nome: nome,
            id: id,
            total: total
        }
        return res.redirect('/home');
    }
    logout(req, res){ 
        req.session.logado = false
        return res.redirect('/login');
    }
}

module.exports = new LoginControllers();