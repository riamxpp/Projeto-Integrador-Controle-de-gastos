const { Router } = require('express');
const Cadastro = require('../controllers/CadastroController');
const Login = require('../controllers/LoginController');
const Home = require('../controllers/HomeController');


const routes = new Router();

routes.get('/cadastro', Cadastro.cadastro);
routes.post('/capturaDados', Cadastro.captura);
routes.get('/', Login.login); 
routes.post('/dadosLogin', Login.captura);
routes.get('/login', Login.login);
routes.get('/home', Home.home);
routes.get('/logout', Login.logout);
// routes

module.exports = routes;