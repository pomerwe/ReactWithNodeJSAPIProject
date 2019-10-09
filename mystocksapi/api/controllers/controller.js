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
    var request = https.request(options, (res)=>{
        
        let result = ''
        let value
        res.on('data', chunk => {
            result += chunk
        })
        res.on('error', error =>{
            myApiRes.send(`Some error happened: ${error}`)
            return;
        });
        res.on('end', ()=>{
            if(result === "Unknown symbol")
            {
                myApiRes.send("There's no stock with that symbol on the database!");  
            }
            else
            {
                value = JSON.parse(result)
            
                con.query("SELECT NAME FROM STOCK WHERE SYMBOL = ?", myApiReq.params.symbol, (error, mysqlRes)=>{
                    if(error)
                    {
                        myApiRes.send(error);
                    }
                    else
                    {
                        let stock = 
                        {
                            stock: myApiReq.params.symbol,
                            name: '',
                            value: value.toFixed(2)
                        }
                        if(mysqlRes.length > 0)
                        {
                            stock.name = mysqlRes[0].NAME; 
                        } 
                        myApiRes.json(stock)
                    }
                })
            }
        });
    });

    request.on('error', error => {
        myApiRes.send(`Some error happened: ${error}`)
        return;
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
            if(mysqlRes.length == 0){
                res.send("There's no stock with that symbol on the database!");  
            }
            else{
                res.json(mysqlRes[0]); 
            }   
        }
    })
}