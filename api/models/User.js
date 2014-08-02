var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	
  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	password: {
  		type: 'string',
  		required: true,
  	},

  	toJSON: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		return obj;
  	}
  },

  beforeCreate: function(user, cb){

  	bcrypt.genSalt(10, function(err, salt){
  		bcrypt.hash(user.password, salt, function(err, hash){
  			if(err){
  				console.log(err);
  				return cb(err);
  			} else{
  				user.password = hash;
  				return cb(null, user);
  			}
  		});
  	});

  }

};
