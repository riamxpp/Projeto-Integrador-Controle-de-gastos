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
        // Acesso.verifEmail(user.email);
        if(Acesso.verifEmail(user.email) == true){
            return res.send('Email já cadastrado!!');
        }
        return res.send(user)
        
        // console.log('aq');
        // await Acesso.createUsers(user);
        // if(!Acesso.verifEmail(email)){
        //     return res.render('pages/cadastro', {error: 'Email já cadastrado.'});
        // };

        }
}

module.exports = new CadastroController()