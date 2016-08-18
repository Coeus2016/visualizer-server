///@file controllers.disasters.fires.test.js
/// Tests fires controller functionality

///During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var config = require('../Javascript/rethinkdb_config');
var db = require("rethinkdb");
var bluebird = require("bluebird");

///Require the dev-dependencies
var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var should = chai.should();
var sinonChai = require('sinon-chai');
//chai.use(sinonChai);

var server = require('../server');
var fires = require('../controller/disaster/fires');
//var firesTable = require('../models/disaster/fires_model');

chai.use(chaiHttp);

/// Parent block
describe('FireTest', function() {
    var conn;
    beforeEach(function (done) { /// Before each test the database is emptied
        console.log('before test!');
        
        db.connect(config.firesDatabase).then(function(c) {
             conn = c;
            db.table("fire").delete();
            done();
        })
    })
    
    after(function (done) {
        db.dbDrop(config.firesDatabase);
            conn.close();
            done();
    });

    /**
     * Test the GET /fires route
     */
    describe('/GET All Fires', function () {
        it('should GET all fires as a json object', function (done) {
            try {
                chai.request(server)
                    .get('/fires')
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


