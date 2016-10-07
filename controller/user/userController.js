/*
 Author: Molefe Keletso
 Description: Reql functions
 */

'use strict';

var passwordHasher = require('password-hash-and-salt');
var jwt = require('jsonwebtoken');
var Q = require('q');

/*Thinky ORM and Rethink variables*/
var thinky = require("../../Javascript/users");
var r = thinky.r;
var Errors = thinky.Errors;

var User = require("../../models/user/users");

exports.logout = function(req, res){
  delete req.session.token;
  delete req.session.success;

  res.json({"message": "logged out"});
}

exports.token = function(req, res){
  res.send(req.session.token);
}

exports.login = function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  User
    .filter({"email": email}).nth(0).default(null).run()
    .then(function(user){
      passwordHasher(password).verifyAgainst(user.password, function(error, verified) {
        if(error)
          throw new Error('Something went wrong!');
        if(!verified) {
          res.status(401).json({"message": "wrong"});
        } else {
          Q
            .fcall(function(){
              return jwt.sign({ email: user.email, first_name: user.first_name, last_name: user.last_name }, "We love COS301");
            })
            .then(function(token){
              req.session.token = token;
              return token;
            })
            .then(function(token){
              res.status(202).json({"message": token});
            }).done();
        }
      });
    })
    .catch(Errors.DocumentNotFound, function (err){
      res.status(404).json({"message": "user does not exist"});
    });
}

exports.register = function(req, res){
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var password = req.body.password;

  passwordHasher(password).hash(function(error, hash) {
    if (error)
      throw new Error('Something went wrong!');

    User
      .filter({"email": email}).nth(0).default(null).run()
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
