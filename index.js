const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const User = require('./Models/User');
const Session =  require('./Models/Session')
const Recipe = require('./Models/Recipe')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.set('view engine', 'pug')
app.use(express.static('public'))
var loginware = function (req, res, next) {
    Session.find_by({token: req.cookies.sessionToken}).then(result => {
        if(result.length == 1){
            req.username = result[0].username;
        }
        
        next()
    })
}

app.get('/', (req,res) =>{
    var recepy = Recipe.find_all().then(result =>{
        res.render('index', {"recipes": result})
    })
})


app.use(loginware)
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
        let recipe = Recipe.create(req.username,req.body.name, req.body.description)
        res.send("Recipe saved!")
    }
})
app.get('/recipe/update/:id', (req, res)=>{
    if(!req.username) res.redirect('/login')
    else{
        let recipe = Recipe.find_by({id: req.params.id})
    }
})
app.post('/login',  (req,res)=> {
    let user = User.login({username: req.body.username, password: req.body.password}).then(token =>{
        res.cookie('sessionToken', token);
        res.send(Session.find_by({token: req.cookies.sessionToken}));
    }).catch(error => console.log(error));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))