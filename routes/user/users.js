/*
 Author: Molefe Keletso Patrick
 Description: Login/Register Routes
 */

'use strict';

module.exports = function(app){
  var authentication = require("../../controller/user/userController.js");

  app.route('/login').post(authentication.login);
  app.route('/register').post(authentication.register);
  app.route('/token').get(authentication.token);
  app.route('/logout').get(authentication.logout);
  app.use(function(err,req,res,next){
    if (err.name === 'UnauthorizedError'){
      res.status(401).json({message: "invalid token"});
    }
  });
};
