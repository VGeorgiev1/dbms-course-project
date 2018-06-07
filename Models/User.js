const Model = require('./Model')
const Session = require('./Session.js')
module.exports =
class User extends Model{
    constructor(name, password, email){
        super()
        this.name = name;
        this.password = password,
        this.Email = email
    }
    static create(name, password, email){
        let user = new User(name,password,email)
        user.save()
        return user
    }
    save(){
        super.save(this.name,this.password,this.Email)
    }
    static get columnsNames(){
        return ['username', 'password', 'email']
    }
    static get tableName(){
        return 'users'
    }
    static find_by(args){
        return Model.findBy(args, this.tableName);
    }
    static async login(args){
        var user = await User.find_by(args)
        if(user.length == 1)
        {
            return Session.create(user[0].username).token;
        }
    }

};
