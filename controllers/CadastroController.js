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
                return res.render('pages/cadastro', { erro: 'Nenhum campo pode ficar vazio!'});
        }
        if(await Acesso.verifEmail(user.email)){
            return res.render('pages/cadastro', { erro: 'Email já cadastrado' });
        }
        Acesso.createUsers(user);
        req.session.logado = true
        return res.redirect('/home', { captura: this.captura})
        }
}

module.exports = new CadastroController()