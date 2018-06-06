const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const User = require('./Models/User.js');
const Database = require('./Models/Utils')
const Session =  require('./Models/Session')
Database.connect()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/register', (req, res) => res.render('register'))
app.post('/register',  (req,res)=> {
    let user = User.create(req.body.username, req.body.password, req.body.Email)
    user.save()
})

app.get('/login', (req, res) => {

    Session.find_by({token: req.cookies.sessionToken}).then(result => {
        if(result.length == 1)
        {
            res.send(result[0].username  + "string ili nesto takowa");
        } else {
            res.render('login')
        }
    })
})  
app.post('/login',  (req,res)=> {
    let user = User.login({username: req.body.username, password: req.body.password}).then(token =>{
        res.cookie('sessionToken', token);
        res.send(Session.find_by({token: req.cookies.sessionToken}));

    }).catch(error => console.log(error));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))