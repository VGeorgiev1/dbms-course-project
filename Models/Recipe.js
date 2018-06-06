const Model = require('./Model');
const User = require('./User');
module.exports =
class Recipe{
    constructor(author, name, description, tags){
        super();
        this.author = author;
        this.name = name;
        this.description = description;
        this.tags = tags;
    }
    static create(name, description, tags){
        let recipe = new Recipe(name, description, email);
        recipe.save();
        return recipe();
    }
    async save(){
        let user = await User.find_by({username: this.author});
        Model.save(user.name,this.name, this.description);
        for(let tag of tags)
        {
            //tag
            //check if tag exists
                //tag = find tag
            //else
                //create tag
            //RecipeTagConnection.create(this.id, tag.id)
        }
    }
    static find_by(args){
        return Model.findBy(args);
    }
};