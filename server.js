// Set up express

var express =  require("express");
var fs = require("fs");


// create instance of express
var app = express();

// set initial port -- use for listener
var PORT = process.env.PORT || 3000;

// set up app to handle data parsing and other housekeeping


app.use(express.urlencoded({extended : true}));
app.use(express.json());

// set up routes, point to separate route files

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function(){
    console.log("App is listening on PORT:" + PORT);
});