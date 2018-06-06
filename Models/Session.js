const Database = require('./Utils.js')
const Crypto =  require('crypto')
module.exports =
class Session{
    constructor(name , token){
        this.name = name;
        this.token = token;
    }
    static create(name){
        var session =  new Session(name, Crypto.randomBytes(48).toString("hex"))
        session.save()
        return session;
    }
    save(){
        return Database.execQuery(`INSERT INTO sessions VALUES (
                    "${this.name}",
                    "${this.token}")`);
        
    }
    static find_by(args){
            let query = "SELECT * FROM sessions " + Database.find_by_clause(args)
            console.log(query)
            return new Promise((resolve, reject) =>{
                Database.execQuery(query).then((result)=>{
                    resolve(result);
                })
            })
    }

};
