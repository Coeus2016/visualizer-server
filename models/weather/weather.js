/*
	Author: Molefe Keletso
	Description: Weather Model
*/

var thinky = require("../../Javascript/weather_config");

module.exports = thinky.createModel("Weather",{
	description: String,
	country: String,
	time: Number,
	temp: Number,
  temp_min: Number,
  temp_max: Number,
	wind: Object,
	humidity: Number,
	weather_icon: String,
	weather_description: String
},{
	pk: "id"
});
