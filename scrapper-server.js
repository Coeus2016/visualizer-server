
// modules ====================================================
var express = require("express");
var r = require("rethinkdb");
var bluebird = require("bluebird");
//var jwt = require("express-jwt");
//var cors = require("cors");
//var dbModel = new db();
//dbModel.setupDisastersDB();

// configuration ============================================
// config files
//require('../Javascript/mongodb_config.js');
var config = require('./Javascript/rethinkdb_config.js');

var app = express();
//app.use(express.static(__dirname + "/public"));
var port = 3500;        // or var port = process.env.PORT || 3500;
var scrapeCount = 1;
var database = "quake";

// USGS earthquake data feed url
var feedUrl = "earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// Fetch data from USGS, transform locations into point objects.
// Insert the data into the 'earthquakes' table.
var refresh = r.db("earthquakes").table("quakes").insert(r.http("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")("features").merge(function(item) {
  return {
    geometry: r.point(item("geometry")("coordinates")(0),
      item("geometry")("coordinates")(1))
  }
}), {conflict: function(id, oldDoc, newDoc) {
  return oldDoc;
}});


// Use the refresh query above to automatically update the 'earthquake' database
// with new data at 30 minutes intervals and delete the records that are older than 30 days
var time;
setInterval(function() {
    time = new Date();
    console.log("Scrapping number: " + scrapeCount++ + ", current-time: " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

    var connect;

    r.connect(config.database).then(function (c) {
        connect = c;

        return bluebird.join(refresh.run(connect), r.table("quakes")
            .filter(r.epochTime(r.row("properties")("time").div(1000)).lt(
                r.now().sub(60 * 60 * 24 * 30))).delete().run(connect));
    }).error(function(err) {
        console.log("Failed to refresh:", err);
    }).finally(function() {
        if (connect)
            connect.close();
    });
<<<<<<< HEAD
}, (300 * 1000 * 60));
=======
}, (5 * 1000 * 60));
>>>>>>> 2f3d8b0865265b8b8c857ba6942c2909ac9c183f

// start app =================================================
app.listen(port);
console.log("Scrapper Server running on port: " + port);
exports = module.exports = app;
