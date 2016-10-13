/*
 Author: Molefe Keletso
 Description: Users Model
 */

var thinky = require("../../Javascript/users");

module.exports = thinky.createModel("Users",{
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  favourates: Array
},{
  pk: "email"
});
