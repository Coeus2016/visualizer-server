/*'use strict'

var thinky = require('thinky')({
    host: 'localhost',
    port: 28015,
    db: 'DisastersDB'
});

var r = thinky.r;
var Disaster = thinky.createModel('Disaster', {
    DisasterID: Number,
    Type: String,
    Active: Boolean,
    Location: {
        latitude: Number,
        longitude: Number,
        name: String
    },
    //{type: "Point", coordinates: [longitude, latitude], name: String}
    Desription: String,
    StartDate: Date
});

exports.list = function(req, res){
    Disaster.orderBy({index: r.incr('DisasterID')}).run().then(function(allDisasters){
        res.json(allDisasters);
    }).error(function(err){
        res.json({message: err});
    });
};

exports.add = function(req, res){
    var newDisaster = new Disaster(req.body);

    newDisaster.save().then(function(result){
        res.json(result);
    }).error(function(err){
        res.json({message: err});
    });
}

exports.get = function(req, res){
    Disaster.get(req.params.id).run().then(function(getDisaster){
        res.json(getDisaster);
    }).error(function(err){
        res.json({message:err});
    });
};

exports.update = function(req, res){
    Disaster.get(req.params.id).run().then(function(getDisaster){
        /*if(req.body.Type){
         getDisaster.Type = req.body.Type;
         }*/

  /*      if(req.body.Active){
            getDisaster.Active = req.body.Active;
        }

        if(req.body.Desription){
            getDisaster.Description = req.body.Description;
        }

        /*if(req.body.StartDate){
         getDisaster.StartDate = req.body.StartDate;
         }*/

        /*if(req.body.Location){
         getDisaster.Location = req.body.Location;
         }*/
    /*    getDisaster.save().then(function(result){
            res.json(result);
        }).error(function(err){
            res.json({message:err});
        });
    });
};*/

/*exports.delete = function(req, res){
    Disaster.get(req.params.id).run().then(function(getDisaster){(
        getDisaster.delete().then(function(result){
            res.json(result);
        }).error(function(err){
            res.json({message: err});
        });
    }).error(function(err){
        res.json({message: err});
    });
}*/




// module.exports = {
//
//     schema: true,
//
//     attributes: {
//
//         location: {
//             type: 'string',
//             required: true,
//                 longitude: {
//                     type: 'string'
//                 },
//
//                 lattitude: {
//                     type: 'string'
//                 },
//
//                 name: {
//                     type: 'string'
//                 }
//
//         },
//
//         active: {
//             type: 'string',
//             false: {
//                 type: 'string'
//             },
//             true: {
//                 type: 'string'
//             }
//         },
//
//         type: {
//             type: 'string',
//
//         },
//
//         description: {
//             type: 'string'
//         }
//
//         // toJSON: function() {
//         //   var obj = this.toObject();
//         //   delete obj.password;
//         //   delete obj.confirmation;
//         //
/**
 *
 * @description: A collection of attributes describing disasters that are happening all over the world
 */
module.exports = {
    schema: true,
    attributes: {
        disasterID: {
            type: 'integer',
            autoIncrement: true,
            unique: true,
            primaryKey: true,
        },

        type: {
            type: 'string',
            required: true
        },

        active: {
            type: 'boolean',
            required:true
        },

        startDate: {
            type: 'datetime',
            required: true
        },

        location: {
            type: 'string',
            required: true,
            longitude: {
                type: 'string',
                required: true
            },
            latitude: {
                type: 'string',
                required: true
            },
            name: {
                type: 'string',
                required: true
            }
        },

        description: {
            type: 'string',
            defaultsTo: 'No description'
        }
    }
};