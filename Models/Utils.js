const mysql = require('mysql')
var  connection
module.exports =
    class Database{
    static find_by_clause(args){
        let sql = "WHERE " + Object.keys(args).map(()=>{
            return "?? = ?"
        }).join(" AND ")
        sql = mysql.format(sql,[].concat(...Object.keys(args).map((key)=> [key,args[key]])))
        return sql
    }
    static connect(){
        connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'luchenasupa'
        });
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              return;
            } 
           console.log('connected as id ' + connection.threadId);
          });
          connection.query("CREATE DATABASE IF NOT EXISTS cooking_db;", function (err, result) {
              if (err) throw err;
          });
          connection.query("USE cooking_db;", function (err, result) {
              if (err) throw err;
          });
          connection.query(`CREATE TABLE IF NOT EXISTS users(
                            username VARCHAR(30)
                            ,email VARCHAR(30),
                            password VARCHAR(30))`,function(err,result){
                                if (err) throw err;})
    }
    static execQuery(query){
        return new Promise( ( resolve, reject ) => {
            connection.query( query, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
}


