const Model = require('./Model');
const User = require('./User');
const Tag = require('./Tag');
const RecipeTagConnection = require('./RecipeTagConnection');
class Recipe extends Model {
    constructor(id, name, description, author, tags) {
        super();
        this.id = id
        this.author = author;
        this.name = name;
        this.description = description;
        this.tags = tags;
    }
    populate() {
        return this
            .query()
            .inner_join(User, ['authorId', 'id'], ['username'])
            .inner_join(RecipeTagConnection, ['id', 'recipeID'], ['tagID'])
            .inner_join(Tag, ['RecipeTagConnections.tagID', 'id'], ['name'])
            .execute()
            .then(rows => {
                this.tags = [];
                rows.forEach((r) => this.tags.push(r.name))
                return this
            });
    }
    static create(author, name, description, tags) {
        let recipe = new Recipe(null, author, name, description, tags);
        recipe.save();
        return recipe;
    }
    async save() {
        User.find_by({
            username: this.author
        }).then(user => {
            return super.save(this.name, this.description, user[0].id);
        }).then(() => {
            return Promise.all(this.tags.map(async tagName => {
                let tag = await Tag.create(tagName)
                let connection = await RecipeTagConnection.create(this.id, tag.id)
            }));
        })
        .catch(err => {
            console.log(err)
        });
    }
    static get tableName() {
        return 'recipes';
    }

    static get columnsNames() {
        return ['name', 'description', 'authorId']
    }
};
Object.assign(Recipe, Model);
module.exports = Recipe