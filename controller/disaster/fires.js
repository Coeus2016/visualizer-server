/// @file fires.js
/// Controller containing functionality for fire 

var config = require('../../Javascript/rethinkdb_config.js');

var r = require("rethinkdb");
var bluebird = require("bluebird");
var database = "fires";
module.exports = {
	
	///@function module.exports.findFires
	/// retrieves all the fires ordered by time as a JSON array
	///@param {object} req object containing  information about HTTP request 
	///@param {object} res the desired HTTP response
    findFires: function (req, res) {
        var conn;
        r.connect(config.firesDatabase).then(function(c) {
            conn = c;

            return r.table("fire").orderBy(
                r.desc(r.row("acq_time"))).run(conn);

        }).then(function(cursor){ return cursor.toArray();}).then(
            function (result) { res.json(result);}).error(function (err) {
            console.log("Error handling request:", err);
            res.status(500).json({success: false, err: err});
        }).finally(function() {
            if(conn)
                conn.close();
        });
    }
}
