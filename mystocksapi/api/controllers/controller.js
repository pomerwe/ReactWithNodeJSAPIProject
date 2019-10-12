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
exports.getQuote = (myApiReq,myApiRes) => {
    options.method = 'GET'
    options.path = `/stable/stock/${myApiReq.params.symbol}/quote?${token}`
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
                values = {
                    currentValue:value.latestPrice.toFixed(2),
                    highValue: value.high.toFixed(2),
                    lowValue: value.low.toFixed(2)
                }
                myApiRes.json(values)
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

exports.getCompanyInfo = (myApiReq, myApiRes) => {
    options.path = `/stable/stock/${myApiReq.params.symbol}/company?${token}`;
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
            myApiRes.json(JSON.parse(result).description);
        })
    });

    httpReq.on('error', error => {
        myApiRes.send(`Some error happened: ${error}`)
        return;
    })
      
    httpReq.end()
}

exports.getAllStocks = (myApiReq, myApiRes)=>{
    con.query("SELECT * FROM STOCK WHERE NAME LIKE ?",myApiReq.params.companyName+'%',(error, mysqlRes) =>{
        if(error){
            myApiRes.send(error);
        }
        else{
            myApiRes.json(mysqlRes);
        }
    })
}


exports.getCompanyLogo = (myApiReq, myApiRes)=>{
    
    options.path = `/stable/stock/${myApiReq.params.symbol}/logo?${token}`;
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


exports.getChartValues = (myApiReq, myApiRes)=>{
    
switch (myApiReq.params.range){
    case 'day':
        options.path=`/stable/stock/${myApiReq.params.symbol}/chart/1d`
    break;

    case 'month':
        options.path=`/stable/stock/${myApiReq.params.symbol}/chart/1m`
    break; 

    case 'year':
        options.path=`/stable/stock/${myApiReq.params.symbol}/chart/1y`
    break;
}
    options.path +=`?${token}&chartSimplify=${true}`
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
            

            var values = JSON.parse(result);
            let returnChartValues = [];
            
            for( let i = 0 ; i < values.length; i++){
                var chartValues = {
                    name: values[i].label,
                    HighPrice:values[i].high,
                    LowPrice: values[i].low
                };
                returnChartValues.push(chartValues)
            }
            console.log(returnChartValues);
            myApiRes.json(returnChartValues);
            
        })
    });

    httpReq.on('error', error => {
        myApiRes.send(`Some error happened: ${error}`)
        return;
    })
      
    httpReq.end()
}

