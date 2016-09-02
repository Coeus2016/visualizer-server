
var config = require('../../Javascript/rethinkdb_config.js');

var r = require("rethinkdb");
var bluebird = require("bluebird");

var database = "earthquakes";

/** Define the `/earthquakes` endpoint for the backend API. It querries the "earthquake" database
 * and retrieves the earthquakes ordered by magnitude and then returns the output as a JSON array
 * 
 * @param req
 * @param res
 */
 exports.findEarthquakes = function (req, res) {
    var conn;
    r.connect(config.database).then(function(c) {
        conn = c;

        return r.table("quakes").orderBy(
            r.desc(r.row("properties")("time"))).run(conn);
    }).then(function(cursor){ return cursor.toArray();}).then(
        function (result) { res.json(result);}).error(function (err) {
        console.log("Error handling /quakes request:", err);
        res.status(500).json({success: false, err: err});
    }).finally(function() {
        if(conn)
            conn.close();
    });
};

/** Define the '/nearest' endpoint for the backend API. It takes two URL query parameters,
 * representing the lattitude and longitude of a point. It then querries the 'earthquakes' table to find the closest
 * earthquake, which is returned as a JSON object
 * 
 * @param req
 * @param res
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

/**
 * 
 * @param req
 * @param res
 */
exports.inbetweenEarthquakes = function (req, res) {
    var conn;
    var firstParam = parseInt(req.params.first);
    var secondParam = parseInt(req.params.second);
    
    r.connect(config.database).then(function(c) {
        conn = c;
        return r.table("quakes").orderBy({index:r.desc('propertiesTime')}).between(firstParam, secondParam).run(conn);
        
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
 * 
 * @param req
 * @param res
 */
exports.lessthanEarthquakes = function (req, res) {
    var conn;
    var firstParam = parseInt(req.params.first);
    
    r.connect(config.database).then(function(c) {
        conn = c;
        return r.table("quakes").filter(r.row("properties")("time").lt(firstParam)).run(conn);

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
 * 
 * @param req
 * @param res
 */
exports.greatorthanEarthquakes = function (req, res) {
    var conn;
    var firstParam = parseInt(req.params.first);

    r.connect(config.database).then(function(c) {
        conn = c;
        return r.table("quakes").filter(r.row("properties")("time").gt(firstParam)).run(conn);

    }).then(function(cursor){ return cursor.toArray();}).then(
        function (result) { res.json(result);}).error(function (err) {
        console.log("Error handling /quakes request:", err);
        res.status(500).json({success: false, err: err});
    }).finally(function() {
        if(conn)
            conn.close();
    });

};

