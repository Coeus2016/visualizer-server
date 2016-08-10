///@file earthquake.js
/// Controller containing functionality for earthquakes 

var config = require('../../Javascript/rethinkdb_config.js');

var r = require("rethinkdb");
var bluebird = require("bluebird");

var database = "earthquakes";

/**
* @function exports.findEarthquakes
*Defines the `/earthquakes` endpoint for the backend API. It queries the "earthquake" database
* and retrieves the earthquakes ordered by magnitude and then returns the output as a JSON array
* @param {object} req object containing  information about HTTP request 
* @param  {object} res the desired HTTP response
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

/**
 * @function exports.findNearestEarthquakes
 * Defines the '/nearest' endpoint for the backend API.  It queries the 'earthquakes' table to find the closest
 * earthquake to the longitude and latitude specified, which then returns the result as a JSON object
 * @param {object} req Takes two URL query parameters, representing the lattitude and longitude of a point.
 * @param {object} res the desired HTTP response
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