/**
 * TestApiController
 *
 * @description :: Server-side logic for managing Testapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
var TestApiController = {
	index: function(req, res) {
		res.send(TestService.sayHello());
	}
};
module.exports = TestApiController;