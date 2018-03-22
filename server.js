var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var mysql = require("mysql");

console.log('--------------the environment we are using----------------');
console.log(app.settings.env);
console.log('--------------the environment we are using----------------');

// if (app.settings.env == 'development') {
//     var connection = mysql.createConnection({
//         port: 3306,
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "quiz_db"
//     });
// } else {
//     var connection = mysql.createConnection(process.env.JAWSDB_URL);
// }
if (process.env.JAWSDB_URL){
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
  }else {
    var connection = mysql.createConnection({
      port: 3306,
      host: "localhost",
      user: "root",
      password: "",
      database: "groupon_db"
    });
  }
// Make connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


app.use(express.static(process.cwd() + "/public"));

app.get('/', function (req, res) {
    var query = "SELECT * FROM scores ORDER BY score DESC"

    connection.query(query, function (err, result) {

        res.render('form', {
            scores: result
        });

    });

});
//   correct answers type here
app.post('/submit', function (req, res) {
    // res.json(req.body);
    var counter = 0;
    if (req.body.question_one == "Seven") counter++;
    if (req.body.question_two == "Ten seasons") counter++;
    if (req.body.question_three == "English") counter++;
    if (req.body.question_four == "Ross") counter++;
    if (req.body.question_five == "An army uniform") counter++;
    if (req.body.question_six == "2 (Joey and Rachel)") counter++;
    if (req.body.question_seven == "Jack and Judy Geller") counter++;
    if (req.body.question_eight == "5") counter++;
    if (req.body.question_nine == "Muriel") counter++;
    if (req.body.question_ten == "Guitar") counter++;

    var query = "INSERT INTO scores (name, score) VALUES (?, ?)";

    connection.query(query, [req.body.name, counter], function (err, result) {

        res.redirect('/');
    });
});


// var port = 4000;
// app.listen(port, function () {
//     console.log('listening on port ' + port);
// });
var port = 3000;

if (process.env.PORT){
    port = process.env.PORT;
}