const mysql = require('mysql')
class Model{
    save(...values){
        return Model.execQuery(`INSERT INTO ${this.constructor.tableName}(${Array(this.constructor.columnsNames.length).fill('??').join(',')}) VALUES (${Array(values.length).fill('?').join(',')})`, this.constructor.columnsNames.concat(values));
    }
    
    static find_by(args){
        let sql = `SELECT * FROM ${this.tableName} WHERE ` + Object.keys(args).map(() => {
            return "?? = ?"
        }).join(" AND ")
        return this.execQuery(sql, [].concat(...Object.keys(args).map((key) => [key, args[key]])))
    }
    static find_all(){
        let sql = `SELECT * FROM ${this.tableName}`
        return this.execQuery(sql)
    }
    static execQuery(query, args) {
        return new Promise((resolve, reject) => {
            let request = args ? mysql.format(query, args) : query;
            console.log(request)
            this.connection.query(request, (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
};

Model.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'luchenasupa'
});

Model.connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + Model.connection.threadId);
    Model.execQuery("CREATE DATABASE IF NOT EXISTS cooking_db;").then(
    Model.execQuery("USE cooking_db;")).then(
    Model.execQuery(`CREATE TABLE IF NOT EXISTS users(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            username VARCHAR(30),
                            password VARCHAR(30),
                            email VARCHAR(30));`)).then(
    Model.execQuery(`CREATE TABLE IF NOT EXISTS sessions(
                            username VARCHAR(30),
                            token VARCHAR(100));`, )).then(
    Model.execQuery(`CREATE TABLE IF NOT EXISTS recipes(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(30),
                            description TEXT,
                            authorID INT NOT NULL,
                            FOREIGN KEY (authorID) REFERENCES users(id)
                            ON DELETE CASCADE);`                            
                            )).catch(err => console.log("Creation error", err))
});


module.exports = Model