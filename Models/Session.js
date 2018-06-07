const Model = require('./Model');
const Crypto =  require('crypto')

class Session extends Model{
    constructor(name , token){
        super();
        this.username = name;
        this.token = token;
    }
    static create(name){
        var session = new Session(name, Crypto.randomBytes(48).toString("hex"))
        session.save()
        return session;
    }
    save(){
        return super.save(this.username, this.token)
    }

    static get tableName()
    {
        return 'sessions';
    }
    static get columnsNames(){
        return ['username', 'id']
    }
};
Object.assign(Session, Model);
module.exports = Session