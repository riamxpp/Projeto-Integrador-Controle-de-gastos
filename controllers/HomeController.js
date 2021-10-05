// const Acesso = require('../models/db');
class HomeController {
    home(req, res){
        if(req.session.logado){
            const dadosUsuarios = req.session.dadosUser;
            res.render('pages/home', { dadosUsuarios });
        }else {
            res.redirect('/login');
        }
    }
}


module.exports = new HomeController();