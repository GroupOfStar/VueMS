const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'vuems'
});

// 暴露出去
module.exports = connection;