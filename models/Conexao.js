const Sequelize = require('sequelize');

const conexao = new Sequelize("usuarios", "root", "56ev7wl1k33-", {
    host: "localhost",
    dialect: "mysql"
});

// teste de conexão
conexao.authenticate()
// .then(() => {
//     console.log('Conexão realizada!');
// }).catch((erro) => {
//     console.log(`Erro: ${erro}`);
// });

module.exports = conexao;