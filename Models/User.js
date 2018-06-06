const Session = require('./Session')
const Model = require('./Model');
module.exports =
class User extends Model{
    constructor(name, password, email){
        super();
        this.name = name;
        this.password = password,
        this.Email = email
    }
    static create(name, password, email){
        let user = new User(name,password,email);
        user.save();
        return user;
    }
    save(){
        return super.save(this.name, this.password, this.Email)
    }
    static find_by(args){
        return Model.findBy(args, this.tableName)
    }

    static get tableName()
    {
        return 'users';
    }

    static async login(args){
        var user = await User.find_by(args)
        console.log(user);
        if(user.length == 1)
        {
            return Session.create(user[0].username).token;
        }
        else
        {
            throw new Error("User not found or too many");
        }
    }
};
