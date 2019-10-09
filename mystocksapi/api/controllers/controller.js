var con = require("../../database/connection");

exports.clientes = (req,res) => {
    
    con.query('SELECT name FROM test',(error,result,fields)=>{
        clientes = result;
        console.log(error) 
        console.log("----")
        console.log(result)
        console.log("----")
        console.log(fields)
        console.log("----")
        res.json(result);

    });
    
 
}