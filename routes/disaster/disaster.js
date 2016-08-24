/**
 *@file disaster.js
 *Stores all the routes that will be required  
 */

'use strict';


/**
 * Module for all disaster routes
 * @param app
 */
module.exports = function(app) {

    var droughts = require('../../controller/disaster/drought');
    var dust_storms = require('../../controller/disaster/dust_storms');
    var earthquakes = require('../../controller/disaster/earthquakes');
    var fires = require('../../controller/disaster/fires');
    var floods = require('../../controller/disaster/floods');
    var severe_storms = require('../../controller/disaster/severe_storms');
	
	
  /**
     * Return droughts json object
     */
    app.route('/droughts').get();
	
  /**
     * Return dust_storms json object
     */
    app.route('/dust_storms').get();
	
	
   //Earthquake routes

    /**
     * Route for accessing all earthquakes on the database
     */
    app.route('/earthquakes').get(earthquakes.findEarthquakes);
    /**
     * Route for accessing earthquakes between pecified years in epochTime
     */
    app.route('/inbetween/:first/:second').get(earthquakes.inbetweenEarthquakes);
    /**
     * Route for accessing earthquakes less than a specified year in epochTime
     */
    app.route('/lessthan/:first').get(earthquakes.lessthanEarthquakes);
    /**
     * Route for accessing earthquakes greator than an specified year in epochTime
     */
    app.route('/greatorthan/:first').get(earthquakes.greatorthanEarthquakes);
    
    
  //Fires routes
  /**
     * Route for accessing all the fires
     */
    app.route('/fires').get(fires.findFires);
    
      /**
     * Route for accessing all fires that occurred between the first and second epochTimes specified
     */
    app.route('/inBetweenfires/:first/:second').get(fires.inBetween);
    
    /**
     * Route for accessing all fires that occurred before the epochTime specified
     */
    app.route('/lessThanFires/:first').get(fires.lessThan);
    
    /**
     * Route for accessing all fires that occurred after the epochTime specified
     */
    app.route('/greaterThanFires/:first').get(fires.greaterThan);
    
    
    
  //Fllods routes
  /**
     * Return floods json object
     */
    app.route('/floods').get();
    
    
    //severe storms routes

  /**
     * Return severe_storms json object
     */
    app.route('/severe_storms').get();

};

