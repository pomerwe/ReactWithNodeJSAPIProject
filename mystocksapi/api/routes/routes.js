'use strict';
module.exports =  function(app) {
    var controller = require('../controllers/controller');
  
    app.get('/clientes', controller.clientes)
  };