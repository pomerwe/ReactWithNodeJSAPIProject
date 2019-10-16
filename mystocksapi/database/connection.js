//Mysql Instance
const mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'mystocksdb'
});


connection.connect((error) => {
    if(error){
        console.log("Erro: " + error.sqlMessage);
        console.log("Importe o banco de dados corretamente!");
        process.exit()
    }
    else{
        console.log("Connection Success!");
    }
});

//In the next lines I'll make a function for populate my database'mystocksdb' 
//The code will be commented since I've already imported the data

// const https = require('https')



// function populatingStockDatabase()
// {
//     var options = {
//         hostname: 'cloud.iexapis.com',
//         path: '/stable/ref-data/symbols?token=pk_4f86b387dfb846de98e823999d096d59',
//         method: 'GET',
//         port: 443,
//     }
//     var req = https.request(options, res => {
//         let result = '';
//         let stockObjList;
//         res.on('data', chunk => {
//             result += chunk;
//         })

//         res.on('end', () => {
//             stockObjList = JSON.parse(result)
//             for(let i = 0; i< stockObjList.length; i++){
//                 connection.query('SELECT SYMBOL FROM STOCK WHERE SYMBOL = ?', stockObjList[i].symbol, (error,res)=>{
//                     if(res.length == 0){
//                         connection.query(
//                             'INSERT INTO STOCK(SYMBOL,NAME) VALUES(?,?)',[stockObjList[i].symbol, 
//                             stockObjList[i].name],
//                             (error,result)=>{
//                                 if(error){
//                                     console.log(error);
//                                     return;
//                                 }
//                                 else{
//                                     console.log(result);
//                                 }
                        
//                             }
//                         ); 
//                     }
//                 })
                
//             }
//         })
//     })
  

//   req.on('error', error => {
//     console.error(error)
//   })
  
//   req.end()
// }

// populatingStockDatabase();

module.exports = connection;
