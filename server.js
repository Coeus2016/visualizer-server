var http = require('http');
var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
var session	= require('express-session');
var expressJwt = require('express-jwt');
var app = express();

var server = http.createServer(app);
var sockio = require("socket.io");
var io = sockio.listen(app.listen(3300),{log:false});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(session({ secret: "We love COS301", resave: false, saveUninitialized: true }));

app.use('/', expressJwt({ secret: "We love COS301"}).unless({ path: ['/login', '/register','/token','/logout'] }));

app.use(morgan('dev'));

var port = 3300;

//routes
require('./routes/disaster/disaster')(app,io);//pass our application into our disaster route
require('./routes/weather/weather')(app);//weather route
require('./routes/user/users')(app);//Login and Register

//require('./scrapper-server');
//require('./fireScrapData');

//start app
//app.listen(port);
//server.listen(port);
console.log("Server listening on port " + port);
exports = module.exports = app;
