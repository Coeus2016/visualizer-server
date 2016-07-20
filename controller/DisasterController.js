var Disaster = require('./model/Disaster.js');
module.exports = {
	create: function(req, res){
		var newDisaster = new Disaster(req.body);

		newDisaster.save().then(function(result){
			res.json(result);
		}).error(function(err){
			res.json({message: err});
		});
	},

	show: function(req, res){
		Disaster.orderBy('DisasterID').run().then(function(allDisasters){
			res.json(allDisasters);
		}).error(function(err){
			res.json({message: err});
		});
	},

	get: function(req, res){
		Disaster.get(req.params.id).run().then(function(getDisaster){
			res.json(getDisaster);
		}).error(function(err){
			res.json({message:err});
		});
	},

	update: function(req, res){
		Disaster.get(req.params.id).run().then(function(getDisaster){
		/*if(req.body.Type){
			getDisaster.Type = req.body.Type;
		}*/

		if(req.body.Active){
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
		getDisaster.save().then(function(result){
			res.json(result);
		}).error(function(err){
				res.json({message:err});
			});
		});
	},
	
	destroy: function(req, res){
		Disaster.get(req.params.id).run().then(function(getDisaster){
				getDisaster.delete().then(function(result){
					res.json(result);
				}).error(function(err){
					res.json({message: err});
				});
		}).error(function(err){
			res.json({message: err});
		});
	}
}	

// var disasterController = {
//
//     index: function (req, res) {
//
//         User.findAll(function (err, users) {
//             if(err) return res.send(err, 500);
//
//             res.view({
//                 model: users
//             });
//         });
//     },
//
//     new: function (res, res) {
//         res.view();
//     },
//
//     edit: function (req, res) {
//     },
//
//
// };
// module.exports = disasterController;