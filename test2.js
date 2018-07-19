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
   var username = req.query.userid;
   var password = req.query.pswrd;

   connection.query('SELECT * FROM login WHERE username = ?',[username], function (error, results, fields) {
   if (error) {
     // console.log("error ocurred",error);
     res.send({
       "code":400,
       "failed":"error ocurred"
     })
   }else{
     // console.log('The solution is: ', results);
     if(results.length >0){
       if(results[0].password == password){
         res.send({
           "code":200,
           "success":"login sucessfull"
             });
       }
       else{
         res.send({
           "code":204,
           "success":"Email and password does not match"
             });
       }
     }
     else{
       res.send({
         "code":204,
         "success":"Email does not exits"
           });
     }
   }
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
