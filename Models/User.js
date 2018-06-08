const Model = require('./Model')
const Session = require('./Session.js')
const bcrypt = require('bcrypt')
class User extends Model{
    constructor(id,name, password, email){
        super()
        this.id = id
        this.username = name;
        this.password = bcrypt.hashSync(password, 10);
        this.Email = email
    }
    static async create(name, password, email){
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
    static async login(username, password){
        let user = await User.find_by({username})
        if(user.length == 1)
        {
            let authenticated = await bcrypt.compare(password, user[0].password);
            if(authenticated)
                return Session.create(user[0].username).token;
            else
                throw Error("password not match")
        }
        else
            throw Error("not implementeduser not found")
    }
};
Object.assign(User, Model);
module.exports = User