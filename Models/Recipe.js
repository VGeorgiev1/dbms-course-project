const Model = require('./Model');
const User = require('./User');
module.exports =
class Recipe extends Model{
    constructor(author, name, description){
        super();
        this.author = author;
        this.name = name;
        this.description = description;
        //this.tags = tags;
    }
    static create(author, name, description){
        let recipe = new Recipe(author,name, description);
        recipe.save();
        return recipe;
    }

    async save(){
        let user = await User.find_by({username: this.author});
        super.save(this.name, this.description, user[0].id);
        //for(let tag of tags)
       // {
            //tag
            //check if tag exists
                //tag = find tag
            //else
                //create tag
            //RecipeTagConnection.create(this.id, tag.id)
        //}
    }
    static get tableName()
    {
        return 'recipes';
    }

    static get columnsNames(){
        return ['name', 'description', 'authorId']
    }
    static find_by(args){
        return Model.findBy(args, this.tableName);
    }
};