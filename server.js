var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();

//var methodOverride = require("method-override");

//   Sets initial port. 
var PORT = process.env.PORT || 8080;

// handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
//allows public folder to serve static files
app.use(express.static(process.cwd() + '/public'));

//app.use(methodOverride("_method"));

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//=======================       ROUTES        =========================================

var routes = require("./controllers/burgers_controller.js");

app.use('/', routes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
  
});