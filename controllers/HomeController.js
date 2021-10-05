const Acesso = require('../models/db');
class HomeController {
    home(req, res){
        if(req.session.logado){
            res.render('pages/home');
        }else {
            res.redirect('/login');
        }
    }
}


module.exports = new HomeController();