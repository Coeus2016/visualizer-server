///@file controllers.disasters.fires.test.js
/// Tests fires controller functionality

///During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
//
// var config = require('../Javascript/rethinkdb_config');
// var db = require("rethinkdb");
// var bluebird = require("bluebird");
//
// ///Require the dev-dependencies
// var chai = require('chai');
// var expect = require('chai').expect;
// var chaiHttp = require('chai-http');
// var sinon = require('sinon');
// var should = chai.should();
// var sinonChai = require('sinon-chai');
// //chai.use(sinonChai);
//
// var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbHVueXpAeWFob28uY29tIiwiZmlyc3RfbmFtZSI6Ik1hbHVsZWtpIiwibGFzdF9uYW1lIjoiTnl1c3dhIn0.ek9iV_iUiPIPNmFsjlHAEqA2UQ-8XjK-8BZo3DNCjx0';
//
// var server = require('../server');
// var fires = require('../controller/disaster/fires');
// //var firesTable = require('../models/disaster/fires_model');
//
// chai.use(chaiHttp);
//
// /// Parent block
// describe('FireTest', function() {
//     var conn;
//     beforeEach(function (done) { /// Before each test the database is emptied
//         console.log('before test!');
//       
//         db.connect(config.firesDatabase).then(function(c) {
//              conn = c;
//             //db.table("fire").delete();
//             done();
//         })
//     })
//   
//     after(function (done) {
//         db.dbDrop(config.firesDatabase);
//             conn.close();
//             done();
//     });
//
//     /**
//      * Test the GET /fires route
//      */
//     describe('Testing Routes', function () {
//         it.skip('should GET all fires as a json object', function (done) {
//             try {
//                 chai.request(server)
//                     .get('/fires')
//                     .set('Authorization', token )
//                     .end(function (err, res) {
//                         res.should.have.status(200);
//                         res.body.should.be.a('array');
//                         done();
//                     });
//             }catch(e) {
//                 done(e);
//             }
//         });
//	
//      /**
//      * Test the GET /inBetweenFires route
//      */
//         it.skip('should GET all fires that are between specified first and second epochTimes as a json object', function (done) {
//             try {
//                 chai.request(server)
//                     .get('/inBetweenFires/1472025600000/1472115600000')
//                     .end(function (err, res) {
//                         res.should.have.status(200);
//                         res.body.should.be.a('array');
// 			res.body.length.should.be.eql(1595);
// 			res.body.should.include({"acq_date":"2016-08-24","acq_time":345,"bright_t31":294.8,"brightness":322.2,"confidence":72,"daynight":"D","frp":49.7,"id":"0139c283-400d-43b9-9f64-099a39df5eec","latitude":-13.661,"longitude":141.733,"satellite":"A","scan":2.6,"track":1.6,"version":"6.0NRT"});
//                         done();
//                     });
//             }catch(e) {
//                 done(e);
//             }
//         });
//
//     /**
//      * Test the GET /lessThanFires route
//      */
//
//         it.skip('should GET all fires before specified epochTime as a json object', function (done) {
//             try {
//		    
//                 chai.request(server)
//                     .get('/lessThanFires/1470783600000')
//                     .end(function (err, res) {
//                         res.should.have.status(200);
//                         res.body.should.be.a('array');
// 			res.body.length.should.be.eql(0);
//                         done();
//                     });
//             }catch(e) {
//                 done(e);
//             }
//         });
//   
//     /**
//      * Test the GET /greaterThanFires route
//      */
//         it.skip('should GET all fires before specified epochTime as a json object', function (done) {
//             try {
//                 chai.request(server)
//                     .get('/greaterThanFires/1470783600000')
//                     .end(function (err, res) {
//                         res.should.have.status(200);
//                         res.body.should.be.a('array');
// 			res.body.length.should.be.eql(25752);
//                         done();
//                     });
//             }catch(e) {
//                 done(e);
//             }
//         });
//     });
// })
//
//
