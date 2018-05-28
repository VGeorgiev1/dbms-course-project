var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'luchenasupa'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
connection.query("CREATE DATABASE IF NOT EXISTS cooking_db;", function (err, result) {
    if (err) throw err;
});
connection.query("USE cooking_db;", function (err, result) {
    if (err) throw err;
});
module.exports = {
    connection
}