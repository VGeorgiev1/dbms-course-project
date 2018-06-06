const mysql = require('mysql')
var connection
module.exports =
    class Database {
        static find_by_clause(args) {
            let sql = "WHERE " + Object.keys(args).map(() => {
                return "?? = ?"
            }).join(" AND ")
            sql = mysql.format(sql, [].concat(...Object.keys(args).map((key) => [key, args[key]])))
            return sql
        }
        static connect() {
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'luchenasupa'
            });
            connection.connect(function (err) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                console.log('connected as id ' + connection.threadId);
            });
            Database.execQuery("CREATE DATABASE IF NOT EXISTS cooking_db;");
            Database.execQuery("USE cooking_db;");
            Database.execQuery(`CREATE TABLE IF NOT EXISTS users(
                                username VARCHAR(30),
                                email VARCHAR(30),
                                password VARCHAR(30));`)
            Database.execQuery(`CREATE TABLE IF NOT EXISTS sessions(
                                username VARCHAR(30),
                                token VARCHAR(100));`,)
        }
        
        static execQuery(query) {
            return new Promise((resolve, reject) => {
                connection.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
        }
    }


