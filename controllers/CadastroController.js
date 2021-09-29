const Acesso = require('../models/db');

class CadastroController {
    cadastro(req, res){
        res.render('pages/cadastro');
    }
    async captura(req, res){
        let user = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
        // 
        // console.log(Acesso.verifEmail(user.email));
        // console.log(user.email + ' 2');
        if(!Acesso.verifEmail(user.email)){
            return res.render('pages/cadastro', {error: 'Email já cadastrado.'});
        };

        // if(!Acesso.verifSenha(senha))
        //     return res.render('pages/cadastro')
        // res.send(user);

        Acesso.createUsers(user)
        return res.redirect('/home')
        }
}

module.exports = new CadastroController()