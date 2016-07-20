
module.exports = function(app) {

    var config = require('./Javascript/rethinkdb_config.js');

    var r = require("rethinkdb");
    var bluebird = require("bluebird");

    var database = "earthquakes";

    // USGS earthquake data feed url
    var feedUrl = "earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

    // Fetch data from USGS, transform locations into point objects.
    // Insert the data into the 'earthquakes' table.
    var refresh = r.table("earthquakes").insert(r.http(feedUrl)("features").merge(function(item) {
        return {
            geometry: r.point(item("geometry")("coordinates")(0),
                              item("geometry")("coordinates")(1))
        }
    }), {conflict: "replace"});


    // Initial setup, creating the database and table and geospatial
    // index on the 'geometry' property, access the above querry and
    // populate the table with data
    var conn;
    r.connect(config.database).then(function(c) {
        conn = c;
        return r.dbCreate(config.database.db).run(conn);
    }).then(function() {
        return r.tableCreate("quakes_table").run(conn);
    }).then(function() {
        return r.table("quakes_table").indexCreate(
            "geometry", {geo: true}).run(conn);
    }).then(function() {
        return refresh.run(conn);
    }).error(function(err) {
        if(err.msg.indexOf("already exists") == -1)
            console.log(err);
    }).finally(function () {
        if(conn)
            conn.close();
    })

    setInterval(function() {
        var connect;
        r.connect(config.database).then(function (c) {
            connect = c;

            return bluebird.join(refresh.run(connect), r.table("quakes_table")
                .filter(r.epochTime(r.row("properties")("time").div(1000).lt(
                r.now().sub(60 * 60 * 24 * 30))).delete().run))
        })
    })


};