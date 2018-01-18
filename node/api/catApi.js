var CategorySchema = require('../schema/categorySchema.js');


module.exports ={

	// This will save the category
	saveCategory:function(data,cb)
	{
		console.log("Data Recived on cat save",data);
		CategorySchema.create(data,function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}else
			{
				return cb(null,result);
			}
		})

	},

// This will fetch all the category
	getCat:function(data,cb)
	{
		var query = CategorySchema.find({});
		query.exec(function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else
			{
				console.log("Categories:--",result);
				return cb(null,result);
			}

		})

	},

//This will delete the category 
	catDelete:function(data,cb)
	{
		CategorySchema.findOneAndRemove({catName:data.target},function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else
			{
				return cb(null,result);
			}
		})

	}
}