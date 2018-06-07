const Model = require('./Model');
const Crypto =  require('crypto')
module.exports =
class Session extends Model{
    constructor(name , token){
        super();
        this.name = name;
        this.token = token;
    }
    static create(name){
        var session = new Session(name, Crypto.randomBytes(48).toString("hex"))
        session.save()
        return session;
    }
    save(){
        return super.save(this.name, this.token)
    }
    static find_by(args){
        return Model.findBy(args, this.tableName)
    }

    static get tableName()
    {
        return 'sessions';
    }
    static get columnsNames(){
        return ['username', 'token']
    }
};
