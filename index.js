const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const User = require('./Models/User.js').User;
const Database = require('./Models/Utils')
Database.connect()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('register'))
app.post('/register',  (req,res)=> {
    let user = User.create(req.body.username, req.body.password, req.body.Email)
    user.save()
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))