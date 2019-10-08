const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'mystocksdb'
});
e

connection.connect((error) => {
    if(error){
        return error;
    }
    else{
        console.log("Connection Success!");
    }
});

module.exports = connection;