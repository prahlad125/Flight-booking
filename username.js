var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "prahladvamsi125",
  database: "Usernames"
});

connection.connect();
var ma = 'prahlad';
var ms = 'prahlad';
connection.query("SELECT * from login", function(err,rows,fields) {
  if (!err) {
    console.log('The solution is: ',rows);
  }
  else {
    console.log('Error while performing query.');
  }
})
connection.end();
