/**
* @file fires.js
* Controller containing functionality for fire
*/

var config = require('../../Javascript/rethinkdb_config.js');

var r = require("rethinkdb");
var bluebird = require("bluebird");
var database = "fires";
module.exports = {

    /**
	* @function module.exports.findFires
	* retrieves all the fires ordered by time as a JSON array
	* @param {object} req object containing  information about HTTP request
	* @param {object} res the desired HTTP response
    */
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
    },

   /*findNearestFires: function(req, res){
	    var latitude = req.param("latitude");
	    var longitude = req.param("longitude");

	    if(!latitude || longitude)
	    {
		    return res.status(500).json({err: "Invalid Point"})
	    }

	    var conn;
	    r.connect(config.firesDatbase).then(function(c){
		    conn = c;

		    return r.table("fire").getNearest(
		    r.point(parseFloat(longitude), parseFloat(latitude)),
		    { index: "geometry", maxDist: 1000, unit: "mi"}).run(conn);
	    }).then(function(result) {res.json(result);}).error(
	    function(err){
		console.log("Error handling /nearestFires request: ", err);
		res.status(500).json({err: err});
	    }).finally(function(){
		 if(conn)
			conn.close();
	    });
    }*/

    /**
	* @function module.exports.inBetween
	* retrieves all the fires that ocurred between certain dates provided as a JSON array
	* @param {object} req object containing information about HTTP request
	* @param {object} res the desired HTTP response
    */
    inBetween: function(req, res){
	 var conn;
	    var paramOne =new Date(parseInt(req.params.first));
	    var paramOneDate = paramOne.getFullYear() + "-" +(paramOne.getMonth()<10?'0':'') +(paramOne.getMonth()+1) + "-" + (paramOne.getDate()<10?'0':'') + paramOne.getDate();
	    var paramOneTime = parseInt((paramOne.getHours()<10?'0':'') + paramOne.getHours() + '' + (paramOne.getMinutes()<10?'0':'') + paramOne.getMinutes());
	    var paramTwo = new Date(parseInt(req.params.second))
	    var paramTwoDate = paramTwo.getFullYear() + "-" +(paramTwo.getMonth()<10?'0':'') +(paramTwo.getMonth()+1) + "-" + (paramTwo.getDate()<10?'0':'') + paramTwo.getDate();
	    var paramTwoTime = parseInt((paramTwo.getHours()<10?'0':'') + paramTwo.getHours() + '' + (paramTwo.getMinutes()<10?'0':'') + paramTwo.getMinutes());

	    r.connect(config.firesDatabase).then(function(c){
		    conn = c;
		   /// return r.table("fire").orderBy({index:r.desc('dateAndTime')}).between(paramOne, paramTwo).run(conn);
		return r.table("fire").filter(r.row("acq_date").ge(paramOneDate).and(r.row("acq_date").le(paramTwoDate))).run(conn);

	    }).then(function(cursor){
		  return cursor.toArray();
	    }).then(function(result){
		    res.json(result);
	    }).error(function(err){
		    console.log("Error handling /inBetweenFires request: ", err);
		    res.status(500).json({success: false, err: err});
	    }).finally(function(){
		    if(conn)
			conn.close();
	    });
    },

    /**
	* @function module.exports.lessThan
	* retrieves all the fires that occured before the date provided as a JSON array
	* @param {object} req object containing  information about HTTP request
	* @param {object} res the desired HTTP response
    */
    lessThan: function(req, res){
	    var conn;
	    var paramOne  = new Date(parseInt(req.params.first));
	    var paramDate = paramOne.getFullYear() + "-" +(paramOne.getMonth()<10?'0':'') +(paramOne.getMonth()+1) + "-" + (paramOne.getDate()<10?'0':'') + paramOne.getDate();
	    var paramTime = parseInt((paramOne.getHours()<10?'0':'') + paramOne.getHours() + '' + (paramOne.getMinutes()<10?'0':'') + paramOne.getMinutes());

	    r.connect(config.firesDatabase).then(function(c){
		conn = c;
		return r.table("fire").filter(r.row("acq_date").le(paramDate).and(r.row("acq_time").lt(paramTime))).run(conn);
	    }).then(function(cursor){
		return cursor.toArray();
	    }).then(function(result){
		res.json(result);
	    }).error(function(err){
		console.log("Error handling /lessThanFires request: ", err);
		res.status(500).json({success: false, err: err});
	    }).finally(function(){
		if(conn)
		    conn.close();
	    });
    },

    /**
	* @function module.exports.greaterThan
	* retrieves all the fires that occured after the date provided as a JSON array
	* @param {object} req object containing  information about HTTP request
	* @param {object} res the desired HTTP response
    */
    greaterThan: function(req, res){
	    var conn;
	    var paramOne = new Date(parseInt(req.params.first));
	    var paramDate = paramOne.getFullYear() + "-" +(paramOne.getMonth()<10?'0':'') +(paramOne.getMonth()+1) + "-" + (paramOne.getDate()<10?'0':'') + paramOne.getDate();
	    var paramTime = parseInt((paramOne.getHours()<10?'0':'') + paramOne.getHours() + '' + (paramOne.getMinutes()<10?'0':'') + paramOne.getMinutes());

	    r.connect(config.firesDatabase).then(function(c){
		conn = c;
		return r.table("fire").filter(r.row("acq_date").ge(paramDate).and(r.row("acq_time").gt(paramTime))).run(conn);
	    }).then(function(cursor){
		return cursor.toArray();
	    }).then(function(result){
		res.json(result);
	    }).error(function(err){
		console.log("Error handling /greaterThanFires request: ", err);
		res.status(500).json({success: false, err: err});
	    }).finally(function(){
		if(conn)
		    conn.close();
	    });
    }

}

