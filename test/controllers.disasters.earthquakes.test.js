/**
 * @file controllers.disasters.earthquakes.test.js
 * Tests earthquakes controller functionality
 */

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var config = require('../Javascript/rethinkdb_config');
var db = require("rethinkdb");
var bluebird = require("bluebird");

//Require the dev-dependencies
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var should = chai.should();
var sinonChai = require('sinon-chai');
//chai.use(sinonChai);

var server = require('../server');
var earthquake = require('../controller/disaster/earthquakes');
//var quakesTable = require('../models/disaster/earthquakes_model');

chai.use(chaiHttp);

// Parent block
describe('EarthQuakeTest', function() {
    var conn;
    beforeEach(function (done) { // Before each test we empty the database
        console.log('before test!');
        
        db.connect(config.database).then(function(c) {
             conn = c;
            db.table("quakes").delete();
            done();
        })
    })
    
    after(function (done) {
        db.dbDrop(config.database);
            conn.close();
            done();
    });

    /**
     * Test the GET /earthquakes route
     */
    describe('/GET All Earthquakes', function () {
        it('it should GET all earthquakes as a json object', function (done) {
            try {
                chai.request(server)
                    .get('/earthquakes')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        //res.body.length.should.be.eql(402);
                        done();
                    });
            }catch(e) {
                done(e);
            }
        });

        /**
         * Test the GET /inbetweenEarthquakes route
         */
        it('should GET all earthquakes that are between specified first and second epochTimes as a json object', function (done) {
            try {
                chai.request(server)
                    .get('/inbetween/1471602678470/1471605529000')
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        //res.body.length.should.be.eql(1595);
                        res.body.should.include({"geometry":{"$reql_type$":"GEOMETRY","coordinates":[-67.3945,18.7155],"type":"Point"},"id":"pr16232001","properties":{"alert":null,"cdi":null,"code":"16232001","detail":"http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/pr16232001.geojson","dmin":0.33866486,"felt":null,"gap":205.2,"ids":",pr16232001,","mag":2.6,"magType":"Md","mmi":null,"net":"pr","nst":13,"place":"39km NW of San Antonio, Puerto Rico","rms":0.46,"sig":104,"sources":",pr,","status":"REVIEWED","time":1471604037700,"title":"M 2.6 - 39km NW of San Antonio, Puerto Rico","tsunami":0,"type":"earthquake","types":",cap,geoserve,origin,","tz":-240,"updated":1471605177708,"url":"http://earthquake.usgs.gov/earthquakes/eventpage/pr16232001"},"type":"Feature"});
                        done();
                    });
            }catch(e) {
                done(e);
            }
        });


        /**
         * Test the GET /lessthanEarthquakes route
         */

        it('should GET all earthquakes before the specified epochTime as a json object', function (done) {
            try {

                chai.request(server)
                    .get('/lessthan/1469623035490')  //27/07/2016 17:37:15
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        //res.body.length.should.be.eql(0);
                        done();
                    });
            }catch(e) {
                done(e);
            }
        });


        /**
         * Test the GET /greatorthanEarthquakes route
         */
        it('should GET all earthquakes after the specified epochTime as a json object', function (done) {
            try {
                chai.request(server)
                    .get('/greatorthan/1471601958000')   //19/08/2016 12:19:18
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        //res.body.length.should.be.eql(25752);
                        done();
                    });
            }catch(e) {
                done(e);
            }
        });
////////?""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""




    });

})