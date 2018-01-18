var mongoose = require('mongoose');

var schema = mongoose.Schema;


	var UserSchema = new schema({


		username:String,
		password:{type:String ,require:true},
		email:String,
		firstname:String,
		lastname:String,
		admin:{type:Boolean ,default:false},
		userImage:String,
		desc:String



		});

module.exports = mongoose.model("Signup",UserSchema);