var con = require("../../database/connection");
var axios = require('axios');
const baseURL = 'https://cloud.iexapis.com:443'
const token = 'token=pk_4f86b387dfb846de98e823999d096d59';
const headers = {
    'Content-Type': 'application-json'
};

const https = axios.create({
    baseURL: baseURL,
    headers: headers,
}); 



exports.getQuote = (myApiReq,myApiRes) => {
    path = `/stable/stock/${myApiReq.params.symbol}/quote?${token}`
    https.get(path)
    .then(
        res =>{
            if(res.data === "Unknown symbol")
            {
                myApiRes.send("There's no stock with that symbol on the database!");  
            }
            else
            {
                value = res.data;
                values = {
                    currentValue:value.latestPrice !== null ? value.latestPrice.toFixed(2) : '--',
                    highValue: value.high !== null ? value.high.toFixed(2) : '--',
                    lowValue: value.low !== null ? value.low.toFixed(2) : '--',
                    previousValue: value.previousClose !== null ? value.previousClose.toFixed(2) : '--'
                }
                myApiRes.json(values)
            }
        }
    )
    .catch(
        error => console.log(error)
    )
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
                myApiRes.send("There's no stock with that symbol on the database!") 
            }
            else{
                myApiRes.json(mysqlRes[0])
            }   
        }
    })
}

exports.getCompanyInfo = (myApiReq, myApiRes) => {
    path = `/stable/stock/${myApiReq.params.symbol}/company?${token}`;
    https.get(path)
    .then(res =>{
        myApiRes.json(res.data.description);
    })
    .catch(error=>{
        console.log(error)
    })
}

exports.getAllStocks = (myApiReq, myApiRes)=>{
    con.query("SELECT * FROM STOCK WHERE NAME LIKE ?",'%'+myApiReq.params.companyName+'%',(error, mysqlRes) =>{
        if(error){
            myApiRes.send(error);
        }
        else{
            myApiRes.json(mysqlRes);
        }
    })
}


exports.getCompanyLogo = (myApiReq, myApiRes)=>{
    path = `/stable/stock/${myApiReq.params.symbol}/logo?${token}`;
    https.get(path)
    .then(res=>{
        myApiRes.json(res.data);
    })
    .catch(error=>{
        console.log(error);
    })
}


exports.getChartValues = (myApiReq, myApiRes)=>{
    
switch (myApiReq.params.range){
    case 'day':
        path=`/stable/stock/${myApiReq.params.symbol}/chart/1d`
    break;

    case 'month':
        path=`/stable/stock/${myApiReq.params.symbol}/chart/1m`
    break; 

    case 'year':
        path=`/stable/stock/${myApiReq.params.symbol}/chart/1y`
    break;
}
    path +=`?${token}&chartSimplify=${true}`

    https.get(path)
    .then(res=>{
        var values = res.data;
        let returnChartValues = [];
        for( let i = 0 ; i < values.length; i++){
            if(values[i].high == null || values[i].low == null) continue
            var chartValues = {
                name: values[i].label,
                HighPrice:values[i].high,
                LowPrice: values[i].low
            };
            returnChartValues.push(chartValues)
        }
        myApiRes.json(returnChartValues)
    })
    .catch(error=>{
        console.log(error)
    })
}


exports.getLatestNews = (myApiReq, myApiRes)=>{
    path = `/stable/stock/${myApiReq.params.symbol}/news/last/10?${token}`;
    https.get(path)
    .then(res=>{
        myApiRes.json(res.data);
    })
    .catch(error=>{
        console.log(error);
    })
}
