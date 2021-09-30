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
        // Acesso.verifEmail(user.email).then(res => {
        //     console.log(res, ' log do controller');
        // })
        // Acesso.verifEmail(user.email);
        if(await Acesso.verifEmail(user.email)){
            return res.send('Email já cadastrado!!');
        }
        Acesso.createUsers(user);
        return res.send(user)
        
        // console.log('aq');
        // if(!Acesso.verifEmail(email)){
        //     return res.render('pages/cadastro', {error: 'Email já cadastrado.'});
        // };

        }
}

module.exports = new CadastroController()