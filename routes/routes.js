const { Router } = require('express');
const Cadastro = require('../controllers/CadastroController');
const Login = require('../controllers/LoginController');
const Home = require('../controllers/HomeController');


const routes = new Router();

//cadastro
routes.get('/cadastro', Cadastro.cadastro);
routes.post('/capturaDados', Cadastro.captura);
//login
routes.get('/', Login.login); 
routes.post('/dadosLogin', Login.captura);
routes.get('/login', Login.login);
routes.get('/logout', Login.logout);
//home
routes.get('/home', Home.home);
routes.post('/dadosUser', Home.dadosUser);

module.exports = routes;