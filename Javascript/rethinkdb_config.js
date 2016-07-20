/*"use strict";
var rethinkdb = require('rethinkdb');

var connection = rethinkdb.connect({
    host: 'localhost',
    port: 28015
}, function(err, data) {
    console.log(data);
    console.log("RethinkDB connected")
});*/

module.exports = {
    database: {
        db: "earthquakes",
        host: process.env.RDB_HOST || "localhost",
        port: process.env.RDB_PORT || 28015
    }
}



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
