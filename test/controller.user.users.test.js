/**
 * @file controllers.user.users.test.js
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
    it('it should POST a filter', function (done) {
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

  });

})
