const Acesso = require('../models/db');
const _ = require('lodash');
const format = require('date-fns/format');

class Historico {
  async historico(req, res){
    if(req.session.logado){
      let dadosUser = req.session.dadosUser
      
      const dadosHistorico = await Acesso.pegandoDados(dadosUser.id);
      _.forEach(dadosHistorico, item => {
        item.createdAt = format(item.createdAt, 'MM/dd/yyyy')
      })

      const dadoTratado = JSON.parse(JSON.stringify(dadosHistorico));
      res.render('pages/historico', { dadoTratado });      
    }else {
      res.render('pages/login', { erro: 'Efetue login para ver seu histórico' });
    }
  }

}

module.exports = new Historico()