const mysql = require('mysql')
const Query = require('./Query')
class Model{
    query()
    {
        return new Query(this.constructor.columnsNames, this.constructor.tableName);
    }
    async save(...values){
        let result = await Model.execQuery(`INSERT INTO ${this.constructor.tableName}
                                    (${Array(this.constructor.columnsNames.length)
                                        .fill('??')
                                        .join(',')}) 
                                    VALUES (${Array(values.length)
                                        .fill('?')
                                        .join(',')})`, 
                                    this.constructor.columnsNames.concat(values));
        console.log(result);
        this.id = result.insertId;
        return this
    }
    static async find_by(args){
        let sql = `SELECT * FROM ${this.tableName} WHERE ` + Object.keys(args).map(() => {
            return "?? = ?"
        }).join(" AND ")
        
        let rows = await this.execQuery(sql, [].concat(...Object.keys(args).map((key) => [key, args[key]]))) 
        let entries = []
        for(let i=0;i< rows.length;i++){
            entries.push(new this(...Object.values(rows[i])))
        }
        return entries
    } 
    static async find_first(args){
        return (await this.find_by(args))[0]
    }
    static delete(args){
        let sql = `DELETE FROM ${this.tableName} WHERE ?? = ?`
        return this.execQuery(sql, ['id',args])
    }
    static async find(id){
        let sql = `SELECT * FROM ${this.tableName} WHERE ID = ?;`
        
        let rows = await this.execQuery(sql, [id]);
        return rows[0]
    } 
    static find_all(){
        let sql = `SELECT * FROM ${this.tableName}`
        return this.execQuery(sql)
    }
    update(args){
        let sql = `UPDATE ${this.constructor.tableName} SET ` + Object.keys(args).map(() => {
            return "?? = ?"
        }).join(", ") + ` WHERE id =${this.id}`
        return Model.execQuery(sql, [].concat(...Object.keys(args).map((key) => [key, args[key]])))
    }
    static execQuery(query, args) {
        return new Promise((resolve, reject) => {
            let request = args ? mysql.format(query, args) : query;
            this.connection.query(request, (err, rows) => {
                if (err)
                    reject(err);
                else{ 
                    resolve(rows);
                }
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
                            id VARCHAR(100));`, )).then(
    Model.execQuery(`CREATE TABLE IF NOT EXISTS recipes(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(30),
                            description TEXT,
                            authorID INT NOT NULL,
                            FOREIGN KEY (authorID) REFERENCES users(id)
                            ON DELETE CASCADE);`)).then(
        Model.execQuery(`CREATE TABLE IF NOT EXISTS tags(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(30));`)).then(
        Model.execQuery(`CREATE TABLE IF NOT EXISTS recipeTagConnections(
                            tagID INT NOT NULL,
                            recipeID INT NOT NULL,
                            FOREIGN KEY (tagID) REFERENCES tags(id)
                            ON DELETE CASCADE,
                            FOREIGN KEY (recipeID) REFERENCES recipes(id)
                            ON DELETE CASCADE,
                            PRIMARY KEY (tagID, recipeID));`)).catch(err => console.log("Creation error", err))
});


module.exports = Model