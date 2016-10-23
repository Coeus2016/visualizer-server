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
var user = require('../controller/user/userController');

chai.use(chaiHttp);

// Parent block
describe('UsersModuleTest', function() {
  var conn;
  beforeEach(function (done) {
    console.log('before test!');

    db.connect(config.usersDatabase).then(function(c) {
      conn = c;
      // db.table("Users").delete();
      done();
    })
  })

  after(function (done) {
    db.dbDrop(config.usersDatabase);
    conn.close();
    done();
  });

  /**
   * Test the GET /earthquakes route
   */
  describe('/POST All Users', function () {
    it('it should POST a message specifying whether the user is already registered', function (done) {
      try {
        chai.request(server)
          .post('/register')
          .set('Authorization', token )
          .send({
            email: "malunyz@yahoo.com",
            first_name: "Maluleki",
            last_name: "Nyuswa",
            password: "maluleki"

          })
          .end(function (err, res) {
            res.body.should.a('object');
            res.body.should.include({"message": "user exist"});
            done();
          });
      }catch(e) {
        done(e);
      }
    });

    it('it should POST a message specifying whether the user is allready logged-in', function (done) {
      try {
        chai.request(server)
          .post('/login')
          .set('Authorization', token )
          .send({
            email: "malunyz@yahoo.com",
            password: "maluleki"

          })
          .end(function (err, res) {
            res.body.should.a('object');
            res.body.should.have.property('message');
            done();
          });
      }catch(e) {
        done(e);
      }
    });

  });

})
