/*
 Author: Molefe Keletso
 Description: Reql functions
 */

'use strict';

var passwordHasher = require('password-hash-and-salt');

/*Thinky ORM and Rethink variables*/
var thinky = require("../../Javascript/users");
var r = thinky.r;
var Errors = thinky.Errors;

var User = require("../../models/user/users");

exports.login = function(req, res){

}

exports.register = function(req, res){
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var password = req.body.password;
  var tempHash = [];

  passwordHasher(password).hash(function(error, hash) {
    if (error)
      throw new Error('Something went wrong!');
    tempHash.hash = hash;

    User.filter({"email": email}).nth(0).default(null).run()
      .then(function(user){
        res.status(409).json({"message": "user exist"});
      })
      .catch(Errors.DocumentNotFound, function (err){
        var userObject = {
          "email": email,
          "first_name": first_name,
          "last_name": last_name,
          "password": hash
        };

        User.save([userObject]).then(function(result) {
          res.status(201).json({"message": "user created"});
        }).error(function(error) {
          res.json({message: error});
        });
      });
  });
}
