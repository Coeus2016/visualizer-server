var thinky = require("../../Javascript/quakes");

module.exports = thinky.createModel("quakes",{
  "geometry": {
    "$reql_type$": String,
    "coordinates": Array,
    "type": String
  } ,
  "id": String,
  "properties": Object,
  "type": String
},{
  pk: "id"
});
