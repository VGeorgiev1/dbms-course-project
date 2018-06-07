const Model = require('./Model');
const Tag = require('./Tag');
const Recipe = require('./Recipe');
const Query = require('./Query');
const RecipeTagConnection = require('./RecipeTagConnection');

let tag = new Recipe(42, 'anser')

console.log(tag
    .query()
    .inner_join(RecipeTagConnection, ['id', 'recipeID'], [])
    .inner_join(Tag, ['tags.id', 'recipeTagConnections.tagID'], ['name'])
    .where({id: 42})
    .execute())