

module.exports = {

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
      					return res.json(200);
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

  logout: function(req, res, next){
  	res.redirect('/');
  }
  
};
