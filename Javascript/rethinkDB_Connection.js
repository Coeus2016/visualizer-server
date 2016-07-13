"use strict";
var rethinkdb = require('rethinkdb');

var connection = rethinkdb.connect({
    host: 'localhost',
    port: 28015
//db: DisastersDB	
}, function(err, data) {
    console.log(data);
    console.log("RethinkDB connected")
});

/*rethinkdb.dbCreate('DisastersDB').run(connection, function(err, result){
    if(err){
        console.log("Database already created");
    }
    else
    {
        console.log("Created new database");
    }
    callback(null, connection);
});*/
