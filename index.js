const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const User = require('./Models/User');
const Session =  require('./Models/Session')
const Recipe = require('./Models/Recipe')
const Tag = require('./Models/Tag')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.set('view engine', 'pug')
app.use(express.static('public'))
var loginware = function (req, res, next) {
    Session.find_by({id: req.cookies.sessionToken}).then((ses)=>{
        if(ses.length == 1){
            req.username = ses[0].username
        }
        next()
    })
    
}

app.use(loginware)

app.get('/', (req,res) =>{
        var recepy = Recipe.find_all().then(result =>{  
            res.render('index', {"recipes": result})
        })
})

app.get('/register', (req, res) => res.render('register'))

app.post('/register',  (req,res)=> {
    let user = User.create(req.body.username, req.body.password, req.body.Email)
    res.send("You just registered!")
})

app.get('/login', (req, res) => {
    if(!req.username) res.render('login')
    else res.send("You are logged in as " + req.username)
})

app.get('/recipe/create', (req,res)=>{
    if(!req.username) res.redirect('/login');
    else res.render('create')
})

app.post('/recipe/create',(req,res)=>{                
    if(!req.username) res.redirect('/login')
    else{ 
        let recipe = Recipe.create(req.body.name, req.body.description, req.username,
                        req.body.tags
                        .split(',')
                        .map(s => s.trim())
                        .filter(t => t !== '')
                        .map(t => t.toLowerCase()))
        res.send("Recipe saved!")
    }
})

app.get('/recipe/update/:id', (req, res)=>{
    if(!req.username) res.redirect('/login')
    else{
        Recipe.find_by({id: req.params.id}).then((result)=>{
            return result[0].populate()
        }).then(populated=>{
            res.render('update', {recipe: populated, id: req.params.id})
        })
    }
})

app.post('/recipe/update/:id', (req,res)=>{
    Recipe.find_by({id: req.params.id}).then((results)=>{
        let recipe = results[0];
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.tags = req.body.tags
            .split(',')
            .map(s => s.trim())
            .filter(t => t !== '')
            .map(t => t.toLowerCase());
        return recipe.update()
    }).then(()=>{
        res.send("Recipe updated successfuly!")
    }).catch(err=>console.log(err))
})

app.get('/recipe/:id', (req, res) =>{
    var recipe = Recipe.find_by({id: req.params.id})
        .then(result => result[0].populate())
        .then(populated => res.render('recipe', {"recipe": populated, "authorised": req.username == populated.author}))
        .catch(err => console.log(err))
})

app.post('/recipe/delete/:id', (req,res)=>{
   Recipe.delete(req.params.id)
   res.redirect('/')
})

app.get('/tags',(req, res)=>{
    Tag.find_all().then((tags)=>{
        res.render('tags', {"tags": tags})
    })
})

app.post('/tag/delete/:id',(req,res)=>{
    Tag.delete(req.params.id)
    res.redirect('/tags')
})

app.post('/login',  (req,res)=> {
    let user = User.login({username: req.body.username, password: req.body.password}).then(token =>{
        res.cookie('sessionToken', token);
        res.send(Session.find_by({id: req.cookies.sessionToken}));
    }).catch(error => console.log(error));
})

app.get('/logout',  (req,res)=> {
    if(req.username){
        Session.delete(req.cookies.sessionToken);
        res.clearCookie("sessionToken");
        res.redirect('/login')
    } 
    else res.send("You are not logged")
})

app.get('/me', (req, res) =>{
    if(req.username){
        var user
        User.find_by({username: req.username}).then(result =>{
            user = result[0]
            Recipe.find_by({authorID: result[0].id}).then(result =>{
                res.render('profile', {'recipes': result, 'user': user})
            })
        })
    }
    else res.send("You are not logged")
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))