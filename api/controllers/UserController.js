var bcrypt = require("bcrypt");
  

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
  },

  login: function(req, res, next){
  	User.findOneByEmail(req.param('email')).done(function(err, user){
  		if(err){
  			return next(err);
  		}

  		if(user){
  			bcrypt.compare(req.param('password'), user.password, function(err, match){
  				if(err){
  					return next(err);
  				}
  				if(match){
                req.session.user = user.id;
      					req.session.authenticated = true;
      					res.json(user);
      					console.log(user);
  				} else{
  					return res.send("Contraseña incorrecta");
  				}
  			});
  		}else{
  			var email = req.param('email');
  			return res.send("este email: "+email+" no es valido"); 
  		}
  	});
  }

};
