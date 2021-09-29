const express = require('express');
const session = require('express-session')
const app = express();
const port = 3030;
const routes = require('./routes/routes');
require('./models/db');


//Definindo a pasta onde vão ficar as rotas
app.set("views", __dirname + "/views");
//Definindo o template engine usado nas views
app.set("view engine", "ejs");
//Definindo pasta do css

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded( {extended: false }));
app.use(session({
    secret: 'diedwerlwrwekwe21',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(routes);

app.listen(port, () => {
    console.log('Servidor iniciado!');
});