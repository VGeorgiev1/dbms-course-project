const Model = require('./Model');

class RecipeTagConnection extends Model{
    constructor(recipeID, tagID){
        super();
        this.recipeID = recipeID;
        this.tagID = tagID;
    }
    static create(recipeID, tagID){
        let connection = new RecipeTagConnection(recipeID, tagID)
        connection.save()
        return connection;
    }
    save(){
        return super.save(this.recipeID, this.tagID)
    }

    static get tableName()
    {
        return 'recipeTagConnections';
    }
    static get columnsNames(){
        return ['recipeID', 'tagID']
    }
};
Object.assign(RecipeTagConnection, Model);
module.exports = RecipeTagConnection