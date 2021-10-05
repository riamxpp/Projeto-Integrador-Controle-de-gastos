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

        let receitaAndDispesa = {
            valorReceita: 0,
            categoriaReceita: '',
            valorDispesa: 0,
            categoriaDispesa: '',
            userId: id,
        }
        
        await Acesso.createReceitas(receitaAndDispesa);

        const total = await Acesso.retornandoTotal(id)
        .then(resolver => resolver);
        console.log('No cadastro controller id '+ id);
        console.log('No cadastro controller '+ total);

        req.session.logado = true
        return res.redirect('/home')
    }
}

module.exports = new CadastroController()