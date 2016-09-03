/*
	Author: Molefe Keletso
	Description: Reql functions
*/

'use strict';

/*Thinky ORM and Rethink variables*/
var thinky = require("../../Javascript/weather_config");
var r = thinky.r;

/*Allows HTTP RESTFul services*/
var request = require("request");

/*Weather Model*/
var Weather = require("../../models/weather/weather");

/*
	Reverse geocode the longitude and latitude using http://photon.komoot.de/,
	check if the data is already available for a place in the cache,
	if not pull data and  cache it.
*/
exports.get = function(req, res){
	/*Reverse Geocode the longitude and latitude*/
	request({
		uri: "http://photon.komoot.de/reverse?lon="+req.body.lon+"&lat="+req.body.lat,
		method: "GET"
	}, function(error, response, body) {
		/*
			Parse body and,
			Get country name,
			Get city name,
			Get name
		*/
		var result = JSON.parse(body);

    if (typeof result.features[0]==="undefined"){
      res.status(204).send();
      return;
    }

		var country = result.features[0].properties.country;
		var city = result.features[0].properties.city;
		var name = result.features[0].properties.name;
		var description;

		if (typeof city!=="undefined")
			description = city;
		else description = name;

    getCachedData(country,description,function(results){
      if (results.length<35){
        deleteOldData(country,description);
        addNewData(country,description,function(response){
          res.status(200).json(response);
        });
      }else {
        res.status(200).json(results);
      }
    });

	});
};

function deleteOldData(country,description){
  return Weather.filter({
    "country": country.toLowerCase(),
    "description": description.toLowerCase()
  }).delete().run().then(function(deleted){
    return deleted;
  });
}

function getCachedData(country, description,callback){
  Weather
    .filter(
      r
        .row("time")
        .gt(Date.now())
        .and(r.row("country").eq(country.toLowerCase()).and(r.row("description").eq(description.toLowerCase())))
    )
    .orderBy("time")
    .run()
    .then(function(result){
      callback(result);
    })
    .error(function(err){
      res.json({message: err});
    });
}

function addNewData(country, description,callback){
  request({
    uri: "http://api.openweathermap.org/data/2.5/forecast?q="+description+","+country+"&units=metric&cnt=40&mode=json&appid=f008bbc82eaffb5f3ac52a2806311d15",
    method: "GET"
  },function(error, response,body){
    var list = JSON.parse(body).list;
    var resul = [];

    for (var i=0; i<list.length; i++){
      var date = parseInt(list[i].dt)*1000;
      var temp = list[i].main.temp;
      var wind = list[i].wind;
      var humidity = list[i].main.humidity;
      var weather_icon = list[i].weather[0].icon;
      var weather_description = list[i].weather[0].description;

      var weatherObject = {
        "description": description.toLowerCase(),
        "country":country.toLowerCase(),
        "time": date,
        "temp": temp,
        "wind": wind,
        "humidity": humidity,
        "weather_icon": weather_icon,
        "weather_description": weather_description
      };
      resul.push(weatherObject);

      Weather.save([weatherObject]).then(function(result) {
      }).error(function(error) {
        res.json({message: error});
      });
    }
    callback(resul);
  });
}
