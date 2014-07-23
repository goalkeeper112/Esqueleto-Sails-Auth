/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  'new': function(req, res){
  		res.locals.flas = _.clone(req.session.flash);
  		res.view();
  		req.session.flash = {};
  },

  create: function(req, res, next){
  	User.create(req.params.all(), function UserCreated(err, user){
  		if(err){
  			console.log(err);
  			req,session.flash = {
  				err: err
  			}
  			
  			return res.redirect('user/nex')
  		}
  		res.json(user);
  		res.session.flash = {};
  	});
  },

  /*read: function(req, res, next){
  	User.findOne(req.params.all(), function UserRead(err, user){
  		if(err){
  			return next(null, err);
  		}else{
  			if(user.username == "goalkeeper112"){
  				console.log("a accesado goalkeeper112");
  				res.redirect('/');
  			}
  		}
  	});
  },*/

  login: function(req, res){
  	res.view();
  }

};
