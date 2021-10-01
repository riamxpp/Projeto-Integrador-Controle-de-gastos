class HomeController {
    home(req, res){
        if(req.session.logado)
            res.render('pages/home');
        else 
            res.send('Faça login');
    }
}


module.exports = new HomeController();