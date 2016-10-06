/*
 Author: Molefe Keletso Patrick
 Description: Login/Register Routes
 */

'use strict';

module.exports = function(app){
  var authentication = require("../../controller/user/userController.js");

  app.route('/login').post(authentication.login);
  app.route('/register').post(authentication.register);
};
