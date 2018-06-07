const Model = require('./Model')
const Session = require('./Session.js')

class User extends Model{
    constructor(id,name, password, email){
        super()
        this.id = id
        this.username = name;
        this.password = password,
        this.Email = email
    }
    static create(name, password, email){
        let user = new User(0,name,password,email)
        user.save()
        return user
    }
    save(){
        super.save(this.username,this.password,this.Email)
    }
    static get columnsNames(){
        return ['username', 'password', 'email']
    }
    static get tableName(){
        return 'users'
    }
    static async login(args){
        var user = await User.find_by(args)
        
        if(user.length == 1)
        {
            return Session.create(user[0].username).token;
        }
    }
};
Object.assign(User, Model);
module.exports = User