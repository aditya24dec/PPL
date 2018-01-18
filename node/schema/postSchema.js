var mongoose = require('mongoose');

var schema = mongoose.Schema;


	var postSchema = new schema({


			title:String,
			category:String,
			time:String,
			date:String,
			username:String,
			imagefile:String,
			comments:[

				{
					text:String,
					user:String
				}
			],
			likes:[
				{
					user:String,
				}
			],
			unlikes:[
				{
					user:String,
				}
			]



	});


	module.exports = mongoose.model("post",postSchema);