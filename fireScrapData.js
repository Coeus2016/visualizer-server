/// @file fireScrapDtata.js
/// This part of the server is responsible for downloading csv data  form source: https://firms.modaps.eosdis.nasa.gov/active_fire/c6/text/MODIS_C6_Global_24h.csv,
/// converting it into json format then persisting it to a fires database
'use strict';
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var Converter = require("csvtojson").Converter;
var converter = new Converter({constructResult:false});
// App variables
var url = 'https://firms.modaps.eosdis.nasa.gov/active_fire/c6/text/MODIS_C6_Global_24h.csv';
var Directory = './data/';
var config = require('./Javascript/rethinkdb_config.js');
var r = require("rethinkdb");
var bluebird = require("bluebird");
var database = "fires";

var express = require("express");
var app = express();
var port = 3600;
var conn;

var mkdir = 'cd  ' + Directory;
var arrayList = [];

///Data for the next 24 hours in cvs format is downloaded from https://firms.modaps.eosdis.nasa.gov then its converten and store in file, fires.json
/// After it is stored, a new database and table is created before the data  can be inserted into the 'fire' table 
var child = exec(mkdir, function(err, stdout, stderr) {
	if (err) throw err;
	else 
	{
		var wfile = fs.createWriteStream(Directory + "fires.json");
		converter.on("record_parsed", function (jsonObj) {
			arrayList.push(jsonObj);
		}).on('end', function(){
			wfile.write(JSON.stringify(arrayList));
			wfile.end();
			console.log("Data converted")
			r.connect(config.firesDatabase).then(function(c) {
				conn = c;
				return r.dbCreate(config.firesDatabase.db).run(conn);
			}).then(function() {
				return r.tableCreate("fire").run(conn);
			}).then(function() {
				var rfile = fs.readFile(Directory + 'fires.json', 'utf8', function(err, data){
					if(err){
						return console.log(err);
					}
					return r.table("fire").insert(JSON.parse(data)).run(conn);
				});
			}).error(function(err) {
				if(err.msg.indexOf("already exists") == -1)
					console.log(err);
			});
		});
		require("request").get(url).pipe(converter);
	}
});
    

    // Use the refresh query above to automatically update the 'fires' database
    // with new data at 30 minutes intervals and delete the records that are older than 30 days
    /*setInterval(function() {
        var connect;
        r.connect(config.database).then(function (c) {
            connect = c;
	//	getData();
            return bluebird.join(refresh.run(connect), r.table("fire")
                .filter(r.epochTime(r.row("acq_time").div(1000)).lt(
                r.now().sub(60 * 60 * 24 * 30))).delete().run(connect));
        }).error(function(err) {
            console.log("Failed to refresh:", err);
        }).finally(function() {
            if (connect)
                connect.close();
        });
    }, 30 * 1000 * 60);*/

app.listen(port);
console.log("Fire Scrapper running on port: " + port);
exports = module.exports= app;
