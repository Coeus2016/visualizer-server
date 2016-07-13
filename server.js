require('./Javascript/mongoDB_Connection.js');
require('./Javascript/rethinkDB_Connection.js');

var express = require("express");
//var jwt = require("express-jwt");
//var cors = require("cors");

var app = express();
var port = 3200;

app.get("/", function(req, res){
    res.send("BACK-END SERVER RUNNING ON PORT 3200");
});

app.listen(port);
console.log("Listening on port " + port);