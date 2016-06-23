'use strict';

var sails = require('sails');

before(function before(done) {


  sails.lift({
	models: {
                connection: 'localDiskDb',
                migrate: 'drop'
	},
        port: 1336,
        environment: 'development',
        log: {
                level: 'error'
        },
        hooks: {
                grunt: false
        }
    // configuration for testing purposes
  }, function callback(err, server) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function after(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});