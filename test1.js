var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

function getMYSQLConnection() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "prahladvamsi125",
    database: "Usernames"
  });
}

var urlencodedParser = bodyParser.urlencoded({extended: true})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Webpage'));
app.use(express.static('Login_v8'));
app.use(express.static('web'));
app.get('/Title.html',function (req, res) {
   res.sendFile( __dirname + "/" + "Login_v8/index.html" );
})
app.use(express.static(__dirname));
app.post('/process_get', urlencodedParser, function (req, res) {


   // Prepare output in JSON format
   var connection = getMYSQLConnection();
   connection.connect();
   var username = req.body.userid;
   var password = req.body.pswrd;

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
         res.sendFile(__dirname + "/" + "web/index.html");
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


app.get('/createuser', function(req,res){
    res.sendFile(path.join(__dirname+ "/" + "/signup.html") );
});
app.post('/adduser', function(req,res){
  var connection = getMYSQLConnection();
  connection.connect();
    var response ={
                    username:req.body.userid,
                    password:req.body.pswrd
                    };
    connection.query("INSERT INTO login (username, password) VALUES ('"+response.username+"','"+response.password+"')", function(error,result,fields){
        if(error){
            res.send({
                                "code":400,
                                "failed":"error ocurred"
                            });
                }
        else {
            console.log("Successfully Registered");
             res.redirect('/Title.html');

            }
    });
});
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

});
