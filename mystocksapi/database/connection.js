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
        return error;
    }
    else{
        console.log("Connection Success!");
    }
});

module.exports = connection;