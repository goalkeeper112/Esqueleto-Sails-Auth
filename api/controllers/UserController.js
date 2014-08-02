
module.exports = {

  create: function(req, res, next){
  	User.create( req.params.all(), function UserCreated(err, user){
  		if(err){
  			return next(err);
  		}

  		res.send({
  			email: user,
  			password: user.password
  		});
  	});
  },

  view: function(req, res, next){
  	User.findOne(req.param('id'), function foundUser(err, user){
  		if(err){
  			return next(err);
  		}
  		if(!user){
  			return next();
  		}
  		res.view({
  			user: user
  		});
  	});
  },

  delete: function(req, res, next){
  	User.findOne(req.param('id'), function(err, user){
  		if(err){
  			return next(err);
  		}
  		if(!user){
  			return next('No existe ese usuario');
  		}

  		User.destroy(req.param('id'), function userDestroyed(err){
  			if(err){
  				return next(err);
  			}
  		});

  		res.redirect('/user');
  	});
  }

};
