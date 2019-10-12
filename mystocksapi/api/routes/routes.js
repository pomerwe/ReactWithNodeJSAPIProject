'use strict';
module.exports =  function(app) {
    var controller = require('../controllers/controller')
  
    app.get('/stock/getQuote/:symbol', controller.getQuote)

    app.get('/stock/getStockName/:symbol', controller.getStockName)

    app.get('/companyInfo/:symbol', controller.getCompanyInfo)

    app.get('/allStocks/:companyName', controller.getAllStocks)

    app.get('/getCompanyLogo/:symbol', controller.getCompanyLogo)

    app.get('/getChartValues/:symbol/:range',controller.getChartValues)
  };