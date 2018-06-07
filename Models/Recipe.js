const Model = require('./Model');
const User = require('./User');
class Recipe extends Model{
    constructor(id,name, description, author){
        super();
        this.id = id
        this.author = author;
        this.name = name;
        this.description = description;
        //this.tags = tags;
    }
    static create(author, name, description){
        let recipe = new Recipe(0,author,name, description);
        recipe.save();
        return recipe;
    }

    async save(){
        User.find_by({username: this.author}).then(user=>{
           
            super.save(this.name, this.description, user[0].id);
        }).catch(err=>{
            console.log(err)
        });
        
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
};
Object.assign(Recipe, Model);
module.exports = Recipe