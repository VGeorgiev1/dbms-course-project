const Database = require('./Utils.js')
class User{
    constructor(name, password, email){
        this.name = name;
        this.password = password,
        this.Email = email
    }
    static create(name, password, email){
            return new User(name,password,email)
    }
    save(){
        Database.execQuery(`INSERT INTO users VALUES (
                    "${this.name}",
                    "${this.Email}",
                    "${this.password}")`);
    }
    static find_by(args){
            let query = "SELECT * FROM users " + Database.find_by_clause(args)
            console.log(query)
            return new Promise((resolve, reject) =>{
                Database.execQuery(query).then((result)=>{
                    resolve(result);
                })
            })
    }

};
module.exports = {
    User
};