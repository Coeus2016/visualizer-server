
// modules ====================================================
var express = require("express");
var r = require("rethinkdb");
var bluebird = require("bluebird");

var parse = require('parse-json-response');
var http = require('http');

var config = require('./Javascript/rethinkdb_config.js');

var app = express();

var port = 3800;
var scrapeCount2 = 1;
var table2 = "floodAreas";

// Shoothill's floods data feed API, implemented by Environmental Agency in UK

var feedUrl = "http://environment.data.gov.uk/flood-monitoring/id/floodAreas";

var feedUrl2 = "http://environment.data.gov.uk/flood-monitoring/id/floods";

var feedUrl3 = "http://environment.data.gov.uk/flood-monitoring/id/floods?min-severity=3";


// Fetch data from API and insert the data into the 'floodAreas' table.

var refresh = r.table(table2).insert(r.http(feedUrl,
    {/*method: 'GET',*/
    header: { "cache-control":        "no-transform, max-age=900",
        "connection":   "keep-alive",
        "content-encoding":     "gzip",
        "content-type": "application/json; qs=2",
        "vary": "accept,Accept-Encoding",
    }, timeout: 5000}
)('items'));

// Create table and index on fwdCode property, access the above querry and
// populate the table with data
var conn;
r.connect(config.database).then(function(c) {
    conn = c;
    return conn ;//r.dbCreate(config.database.db).run(conn);
}).then(function() {
    return r.tableCreate(table2).run(conn);
}).then(function() {
    return r.table(table2).indexCreate(
        "itemsFwdCode", r.row('items')('fwdCode'), {multi: true}).run(conn);
}).then(function() {
    return refresh.run(conn);
}).error(function(err) {
    if(err.msg.indexOf("already exists") == -1)
        console.log(err);
}).finally(function () {
    if(conn)
        conn.close();
});


// Use the refresh query above to automatically update the 'floodAreas' database
// with new data at 15 minutes intervals and delete all previous entries
var time;
setInterval(function() {
    time = new Date();
    console.log("Flood Scrapping number: " + scrapeCount2++ + ", current-time: " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

    var connect;

    r.connect(config.database).then(function (c) {
        connect = c;

        return bluebird.join(refresh.run(connect), r.table(table2).delete()
                .run(connect));

    }).error(function(err) {
        console.log("Failed to refresh:", err);
    }).finally(function() {
        if (connect)
            connect.close();
    });
}, (15 * 1000 * 60));

// start app =================================================
app.listen(port);
console.log("Scrapper Server Floods running on port: " + port);
exports = module.exports = app;
