var express = require('express');
var app = express();
var mysql = require('mysql');

function getMYSQLConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "prahladvamsi125",
    database: "Usernames"
  });
}


app.use(express.static('Webpage'));
app.get('/Title2.html', function (req, res) {
   res.sendFile( __dirname + "/" + "Title2.html" );
})

app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   var connection = getMYSQLConnection();
   connection.connect();

   connection.query("SELECT * from login WHERE username = '" + req.query.userid + "'" + "AND password = '" + req.query.pswrd + "'", function(err,rows,fields) {
     if (!err) {
       console.log('The solution is: ',rows);
       res.sendFile(__dirname + "/" + "login1.html")
     }
     else {
       console.log('Error while performing query.');
     }
   })

   response = {
      first_name:req.query.userid,
      last_name:req.query.pswrd
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
