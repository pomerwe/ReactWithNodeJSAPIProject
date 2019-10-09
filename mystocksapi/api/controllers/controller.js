var con = require("../../database/connection");
const https = require('https');
const hostname = 'cloud.iexapis.com'
const token = 'token=pk_4f86b387dfb846de98e823999d096d59';
const  port = 443
var options = {
    //path,method
    hostname: hostname,
    port: port,
    headers:{
        'Content-Type': 'application-json'
    }
}

exports.getLatestStockValue = (myApiReq,myApiRes) => {
    options.method = 'GET'
    options.path = `/stable/stock/${myApiReq.params.symbol}/quote/latestPrice?${token}`
    console.log(options)
    var request = https.request(options, (res)=>{
        
        let result = ''
        let response
        res.on('data', chunk => {
            result += chunk
        })

        res.on('end', ()=>{
            response = JSON.parse(result)
            myApiRes.json(response)
        });
    });

    request.on('error', error => {
       console.log(error)
      })
      
    request.end()
}

exports.getStockName = (req, res)=>{
    con.query("SELECT NAME FROM STOCK WHERE SYMBOL = ?", req.params.symbol, (error, mysqlRes)=>{
        if(error)
        {
            res.send(error);
        }
        else
        {
            res.json(mysqlRes);    
        }
    })
}