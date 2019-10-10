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
    var httpReq = https.request(options, (httpRes)=>{
        
        let result = ''
        let value
        httpRes.on('data', chunk => {
            result += chunk
        })
        httpRes.on('error', error =>{
            myApiRes.send(`Some error happened: ${error}`)
            return;
        });
        httpRes.on('end', ()=>{
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

    httpReq.on('error', error => {
        myApiRes.send(`Some error happened: ${error}`)
        return;
      })
      
    httpReq.end()
}

exports.getStockName = (myApiReq, myApiRes)=>{
    con.query("SELECT NAME FROM STOCK WHERE SYMBOL = ?", myApiReq.params.symbol, (error, mysqlRes)=>{
        if(error)
        {
            myApiRes.send(error);
        }
        else
        {
            if(mysqlRes.length == 0){
                myApiRes.send("There's no stock with that symbol on the database!");  
            }
            else{
                myApiRes.json(mysqlRes[0]); 
            }   
        }
    })
}

exports.getCompanyInfo = (req, myApiRes) => {
options.path = `/stable/stock/${req.params.symbol}/company?${token}`;
    options.method = 'GET';

    let result = '';

    httpReq = https.request(options, (httpRes)=>{
        httpRes.on('data', chunk=>{
            result += chunk;
        })

        httpRes.on('error', error =>{
            myApiRes.send(error);
            return;
        })

        httpRes.on('end', ()=>{
            myApiRes.json(JSON.parse(result));
        })
    });

    httpReq.on('error', error => {
        myApiRes.send(`Some error happened: ${error}`)
        return;
    })
      
    httpReq.end()
}