/*
	Author: Molefe Keletso
	Description: Test the weather service
*/

'use strict'

var chai = require("chai");
var expect = chai.expect;
var http = require('chai-http');
var server = require('../server');
chai.use(http);

chai.should();

describe("POST /getweather",function() {
	it("respond with a json data of containing weather forecast",function(){
		try{
			chai
				.request(server)
				.post('/getweather')
				.send({"lat":-25.7569701, "lon":28.2117256})
				.end(function(err,res,body){

				});
		}catch(e){
			done(e);
		}
	});
});