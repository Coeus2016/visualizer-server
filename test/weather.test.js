/*
	Author: Molefe Keletso
	Description: Test the weather service
*/

'use strict'

var chai = require("chai");
var expect = chai.expect;
var http = require('chai-http');
var server = require('../server');
var db = require("rethinkdb");
var config = require('../Javascript/rethinkdb_config');
var thinky = require("../Javascript/weather_config");
var r = thinky.r;
chai.use(http);

chai.should();

describe("POST /getweather",function() {
	var conn;
	before(function(done){
		this.timeout(10000);
		/*db.connect(config.weather).then(function(c) {
			conn = c;
			db.table("Weather").delete();
			done();
		});*/
		r.db('weather').tableDrop('Weather').run(conn,function(err, result){
			console.log("LOL");
		});
	});

	//after(function(done) {
		/*db.dbDrop(config.database);
		conn.close();
		done();*/
	//});

	it("respond with a json data of containing weather forecast",function(done){
		/*this.timeout(20000);
		try{
			chai.request(server)
				.post('/getweather')
				.send({"lat":-25.7569701, "lon":28.2117256})
				.end((err, res) => {
                	res.should.have.status(200);
             		done();
            	});
		}catch(e){
			done(e);
		}*/
		//done();
	});
});