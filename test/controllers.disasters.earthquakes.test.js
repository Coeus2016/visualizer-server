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

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbHVueXpAeWFob28uY29tIiwiZmlyc3RfbmFtZSI6Ik1hbHVsZWtpIiwibGFzdF9uYW1lIjoiTnl1c3dhIn0.ek9iV_iUiPIPNmFsjlHAEqA2UQ-8XjK-8BZo3DNCjx0';

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
           // db.table("quakes").delete();
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
        it('it should POST all earthquakes', function (done) {
            try {
                chai.request(server)
                    .post('/filteredquakes')
		                .set('Authorization', token )
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
       * Setting the filter
       */
      it('it should POST a response after inserting a filter into the database', function (done) {
        try {
          chai.request(server)
            .post('/earthquakefilter')
            .set('Authorization', token )
            .send({
              "filter":"{\"location\": -1,\"date\" : 4,\"magnitude\" : 1}"
            })
            .end(function (err, res) {
              //console.log(res.body);
              done();
            });
        }catch(e) {
          done(e);
        }
      });


      /**
       * Test the POST filter by location
       */
      it('it should POST all earthquakes filtered by location as a json object', function (done) {
        try {
          chai.request(server)
            .post('/filteredquakes')
            .set('Authorization', token )
            .send({
              longitude: -149.953,
              latitude: 61.4714
            })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        }catch(e) {
          done(e);
        }
      });

      /**
       * Test the POST filter by date; all earthquakes that occured in the last hour
       */
      it('it should POST all earthquakes filtered by time; that occurred in the last hour as a json object', function (done) {
        try {
          chai.request(server)
            .post('/filteredquakes')
            .set('Authorization', token )
            .send({
              date: 0
            })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        }catch(e) {
          done(e);
        }
      });

      /**
       * Test the POST filter by date; all earthquakes occuring today
       */
      it('it should POST all earthquakes filtered by date; occuring today as a json object', function (done) {
        try {
          chai.request(server)
            .post('/filteredquakes')
            .set('Authorization', token )
            .send({
              date: 1
            })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        }catch(e) {
          done(e);
        }
      });

      /**
       * Test the POST filter by date; all earthquakes that occured in the last 24 hours
       */
      it('it should POST all earthquakes filtered by date; occurred in the last 24 hours as a json object', function (done) {
        try {
          chai.request(server)
            .post('/filteredquakes')
            .set('Authorization', token )
            .send({
              date: 2
            })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        }catch(e) {
          done(e);
        }
      });

      /**
       * Test the POST filter by date; all earthquakes that occured in the last 48 hours
       */
      it('it should POST all earthquakes filtered by date; occured in the last 48 hours as a json object', function (done) {
        try {
          chai.request(server)
            .post('/filteredquakes')
            .set('Authorization', token )
            .send({
              date: 3
            })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        }catch(e) {
          done(e);
        }
      });

      /**
       * Test the POST filter by date; all earthquakes that occured in the last 7 days
       */
      it('it should POST all earthquakes filtered by date; occured in the last 7 days as a json object', function (done) {
        try {
          chai.request(server)
            .post('/filteredquakes')
            .set('Authorization', token )
            .send({
              date: 4
            })
            .end(function (err, res) {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
        }catch(e) {
          done(e);
        }
      });


    });

})
