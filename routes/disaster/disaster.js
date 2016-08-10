'use strict';

module.exports = function(app) {

    var droughts = require('../../controller/disaster/drought');
    var dust_storms = require('../../controller/disaster/dust_storms');
    var earthquakes = require('../../controller/disaster/earthquakes');
    var fires = require('../../controller/disaster/fires');
    var floods = require('../../controller/disaster/floods');
    var severe_storms = require('../../controller/disaster/severe_storms');

    // Return droughts json object
    app.route('/droughts').get();

    // Rreturn dust_storms json object
    app.route('/dust_storms').get();

    // Rreturn earthquakes json object
    app.route('/earthquakes').get(earthquakes.findEarthquakes);
    //app.route('/earthquakes:start').get(earthquakes.findEarthquakes);

    // Rreturn fires json object
    app.route('/fires').get();

    // Rreturn floods json object
    app.route('/floods').get();

    // Rreturn severe_storms json object
    app.route('/severe_storms').get();

};


