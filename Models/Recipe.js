const Database = require('./Utils.js')
const Session = require('./Session.js')
module.exports =
class Recipe{
    constructor(name, instrutions, tags){
        this.name = name;
        this.instrutions = instrutions,
        this.tags = tags
    }
    static create(name, instrutions, tags){
            return new Recipe(name,instrutions,email)
    }
    save(){
        Database.execQuery(`INSERT INTO users VALUES (
                    "${this.name}",
                    "${this.Email}",
                    "${this.password}")`);
    }
    static find_by(args){
            let query = "SELECT * FROM recipies " + Database.find_by_clause(args)
            console.log(query)
            return new Promise((resolve, reject) =>{
                Database.execQuery(query).then((result)=>{
                    resolve(result);
                })
            })
    }
};