class HomeController {
    home(req, res){
        // if(req.session.logado)
        res.render('pages/home');
        // else 
        //     res.render('pages/cadastro');
    }
}


module.exports = new HomeController();