'use strict';
module.exports =  function(app) {
    var controller = require('../controllers/controller')
  
    app.get('/stock/getLatestStockValue/:symbol', controller.getLatestStockValue)

    app.get('/stock/getStockName/:symbol', controller.getStockName)

    app.get('/company/:symbol', controller.getCompanyInfo)

    app.get('/allStocks',controller.getAllStocks)
  };