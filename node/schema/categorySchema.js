var mongoose = require('mongoose');

var schema = mongoose.Schema;


	var categorySchema = new schema({


		catName:String,
		catImage:String

	});


	module.exports = mongoose.model("categorie",categorySchema);