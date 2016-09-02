var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

var port = 3300;

//routes
require('./routes/disaster/disaster')(app);//pass our application into our disaster route
require('./routes/weather/weather')(app);//weather route

//require('./routes/users')(app);

require('./scrapper-server');
require('../visualizer-scrapper/fireScrapData');

//start app
app.listen(port);
console.log("Server listening on port " + port);
exports = module.exports = app;
