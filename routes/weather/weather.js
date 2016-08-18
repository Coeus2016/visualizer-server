/*
	Author: Molefe Keletso Patrick
	Description: Weather Routes
*/

'use strict';

module.exports = function(app){
	var weather = require("../../controller/weather/weather");
	
	app.route('/getweather').post(weather.get);
};
