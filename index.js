const express = require('express')
const app = express()
const connection = require('./db_connection.js').connection
const bodyParser = require('body-parser');
const regcontrollers = require('./controllers/register');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('register'))
app.post('/register', function(req,res){regcontrollers.utils.register(req,res,connection)})

app.listen(3000, () => console.log('Example app listening on port 3000!'))