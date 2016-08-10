var config = require('../../Javascript/rethinkdb_config.js');

var r = require("rethinkdb");
var bluebird = require("bluebird");

var database = "earthquakes";

/** Define the `/earthquakes` endpoint for the backend API. It querries the "earthquake" database
 * and retrieves the earthquakes ordered by magnitude and then returns the output as a JSON array
 */
 exports.findEarthquakes = function (req, res) {
    var conn;
    r.connect(config.database).then(function(c) {
        conn = c;

        return r.table("quakes").orderBy(
            r.desc(r.row("properties")("mag"))).run(conn);
    }).then(function(cursor){ return cursor.toArray();}).then(
        function (result) { res.json(result);}).error(function (err) {
        console.log("Error handling /quakes request:", err);
        res.status(500).json({success: false, err: err});
    }).finally(function() {
        if(conn)
            conn.close();
    });
};

/* Define the '/nearest' endpoint for the backend API. It takes two URL query parameters,
 * representing the lattitude and longitude of a point. It then querries the 'earthquakes' table to find the closest
 * earthquake, which is returned as a JSON object
 */

 exports.findNearestEarthquakes = function (req, res) {
    var latitude = req.param("latitude");
    var longitude = req.param("longitude");

    if(!latitude || !longitude)
        return res.status(500).json({ err: "Invalid Point"});

    var conn;

    r.connect(config.database).then(function(c) {
        conn = c;

        return r.table("quakes").getNearest(
            r.point(parseFloat(longitude), parseFloat(latitude)),
            { index: "geometry", maxDist: 1000, unit: "mi"}).run(conn);
    }).then(function (result) { res.json(result);}).error(
        function (err) {
            console.log("Error handling /nearest request:", err);
            res.status(500).json({err: err});
        }).finally(function () {
        if(conn)
            conn.close();
    });
};
=======
'use strict';

module.exports = function(app) {

    var droughts = require('../../controller/disaster/drought');
    var dust_storms = require('../../controller/disaster/dust_storms');
    var earthquakes = require('../../controller/disaster/earthquakes');
    var fires = require('../../controller/disaster/fires');
    var floods = require('../../controller/disaster/floods');
    var severe_storms = require('../../controller/disaster/severe_storms');

    // Return droughts json object
    app.route('/droughts').get();

    // Rreturn dust_storms json object
    app.route('/dust_storms').get();

    // Rreturn earthquakes json object
    app.route('/earthquakes').get(earthquakes.findEarthquakes);
    //app.route('/earthquakes:start').get(earthquakes.findEarthquakes);

    // Rreturn fires json object
    app.route('/fires').get();

    // Rreturn floods json object
    app.route('/floods').get();

    // Rreturn severe_storms json object
    app.route('/severe_storms').get();

};
