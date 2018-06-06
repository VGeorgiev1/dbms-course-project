const Database = require('./Utils.js')
const Session = require('./Session.js')
module.exports =
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
    static async login(args){
        var user = await User.find_by(args)
        if(user.length == 1)
        {
            return Session.create(user[0].username).token;
        }
        console.log(user);
    }

};
