const express = require('express')
const app = express()
const connection = require('./db_connection.js').connection
app.set('view engine', 'pug')


app.get('/', (req, res) => res.send('Hello World!'))



app.listen(3000, () => console.log('Example app listening on port 3000!'))