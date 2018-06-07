const Model = require('./Model');
const RecipeTagConnection = require('./RecipeTagConnection');
class Tag extends Model{
    constructor(id, name){
        super();
        this.id = id;
        this.name = name;
    }
    static async create(name){
        let tag = new Tag(null, name)
        let found = await this.find_first({name: name})
        if(!found)
        {
            await tag.save()
            return tag
        }
        else
            return found;
    }

    save(){
        return super.save(this.name)
    }

    static get tableName()
    {
        return 'tags';
    }

    static get columnsNames(){
        return ['name']
    }
};
Object.assign(Tag, Model);
module.exports = Tag