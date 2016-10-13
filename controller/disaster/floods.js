var config = require('../../Javascript/rethinkdb_config.js');

var r = require("rethinkdb");
var bluebird = require("bluebird");

var database = "earthquakes";
var table = "floodAreas";

/** Define the `/floods` endpoint for the backend API. It querries the "earthquake" database
 * and retrieves the earthquakes ordered by magnitude and then returns the output as a JSON array
 *
 * @param req
 * @param res
 */
exports.findFloodAreas = function (req, res) {
    var conn;
    r.connect(config.database).then(function(c) {
        conn = c;

        return r.table(table).orderBy(
            r.desc(r.row('items')('fwdCode'))).run(conn);
    }).then(function(cursor){ return cursor.toArray();}).then(
        function (result) { res.json(result);}).error(function (err) {
        console.log("Error handling /quakes request:", err);
        res.status(500).json({success: false, err: err});
    }).finally(function() {
        if(conn)
            conn.close();
    });
};



 
