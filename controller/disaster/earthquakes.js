var thinky = require("../../Javascript/quakes");
var r = thinky.r;
var Errors = thinky.Errors;
var Q = require('q');

var Earthquakes = require("../../models/disaster/earthquakes_model");

exports.filteredquakes = function(req, res){
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var email = req.user.email;
  var changes;

  Q
    .fcall(function(){
      return r.db("users").table("Users").get(email).getField("earthquakes");
    })
    .then(function(quakefilter){
      changes = Earthquakes.filter(function(value){
        var stmt;

        if (quakefilter.date==0){
          stmt = r.now().sub(r.epochTime(value("properties")("time").div(1000))).lt(1*3600);
        }else if (quakefilter.date==1){
          stmt = r.now().date().eq(r.epochTime(value("properties")("time").div(1000)).date());
        }else if (quakefilter.date==2){
          stmt = r.now().sub(r.epochTime(value("properties")("time").div(1000))).lt(24*3600);
        }else if (quakefilter.date==3){
          stmt = r.now().sub(r.epochTime(value("properties")("time").div(1000))).lt(48*3600);
        }else if (quakefilter.date==4){
          stmt = r.epochTime(value("properties")("time").div(1000)).gt(r.now().date().sub(r.now().date().day()));
        }

        if (quakefilter.location == -1){
          return value("properties")("mag").gt(parseFloat(quakefilter.magnitude)).and(stmt);
        }
        else {
          var v = r.point(longitude,latitude);

          return value("properties")("mag").gt(parseFloat(quakefilter.magnitude))
            .and(r.distance(value("geometry"),v,{unit: 'km'}).lt(quakefilter.location)).and(stmt);
        }
      });

      return changes;
    })
    .then(function(quakes){
      res.send(quakes);
    })
    .done(function(){
      changes.changes().run().then(function(feed) {
        feed.each(function(error, doc) {
          if (error) {
            console.log(error);
            process.exit(1);
          }

          if (doc.isSaved() === false) {
            //console.log("The following document was deleted:");
            //console.log(JSON.stringify(doc));
          }
          else if (doc.getOldValue() == null) {
            //console.log("A new document was inserted:");
            //console.log(JSON.stringify(doc));

            exports.io.sockets.emit(email,doc);
          }
          else {
            console.log("A document was updated.");
            console.log("Old value:");
            console.log(JSON.stringify(doc.getOldValue()));
            console.log("New value:");
            console.log(JSON.stringify(doc));
          }
        });
      }).error(function(error) {
        console.log(error);
        process.exit(1);
      });
    });
}
