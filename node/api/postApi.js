var postSchema = require('../schema/postSchema.js');
module.exports ={
	
	//This will save the post 
	savePost:function(data,cb)
	{
    	postSchema.create(data,function(err,result){


			if(err)
			{
				return cb(err,null);
			}
			else
			{
				return cb(null,result);
			}


		})

	},
	// This will fetch all the post
	getPost:function(data,cb)
	{
		var query = postSchema.find({}).sort({date:-1});
		query.exec(function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else
			{
				console.log("Five post:--",result);
				return cb(null,result);
			}

		})
	},
	
	//Filter post according to category 
	filterPost:function(data,cb)
	{
		var query='';
		if(data.catName!="all")
		{
			query=postSchema.find({category:data.catName});
		}
		else
		{
			query=postSchema.find({});
		}
		query.exec(function(err,result)
		{
			console.log("post api Filter Methods",data.catName);
			if(err)
			{
				return cb(err,null);
			}
			else
			{
				return cb(null,result);
			}
		})

	},
	// fetch the single post details
	singlePost:function(data,cb)
	{
		postSchema.findOne({_id:data.id},function(err,result)
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
	},
// This will save the comment
	saveComment:function(data,cb)
	{
		console.log("save Comment function",data.id);
		console.log("Comments",data);
		postSchema.update({_id:data.id},{$push:{comments:{"text":data.text,"user":data.user}}},{upsert:false},function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else
			{
				console.log("Result after update",result);
				return cb(null,result);
			}
		})

	},

	// This method will save the like
	saveLike:function(data,cb)
	{
		console.log("save like function",data.id);
		console.log("Like",data);
		postSchema.find({_id:data.id,"likes.user":data.email},function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else if(result.length!=0)
			{		
					console.log("result",result.length);
					console.log("Liked already");
					return cb(null,"Liked already");
			}else
			{
				postSchema.find({_id:data.id,"unlikes.user":data.email},function(err,result)
				{
					if(err)
						{
							return cb(err,null);
						}
						else if(result.length!=0)
						{		
							console.log("result",result.length);
							console.log("Unliked already");
							return cb(null,"Unliked already");
						}else
						{
							postSchema.update({_id:data.id},{$push:{likes:{"user":data.email}}},{upsert:false},function(err,result)
							{
								if(err)
								{
									return cb(err,null);
								}
								else
								{
									console.log("Result after update",result);
									return cb(null,result);
								}
							})



						}


				})				

			}

		})

	},
// This method will save the unlikes
	saveUnLike:function(data,cb)
	{
		console.log("save Unlike function",data.id);
		console.log("UnLike",data);
		postSchema.find({_id:data.id,"unlikes.user":data.email},function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else if(result.length!=0)
			{		
					console.log("result",result.length);
					console.log("Unliked already");
					return cb(null,"Unliked already");
			}else
			{
				postSchema.find({_id:data.id,"likes.user":data.email},function(err,result)
				{
					if(err)
					{
						return cb(err,null);
					}
					else if(result.length!=0)
					{		
						console.log("result",result.length);
						console.log("Liked already");
						return cb(null,"Liked already");
					}else
					{
						postSchema.update({_id:data.id},{$push:{unlikes:{"user":data.email}}},{upsert:false},function(err,result)
						{
							if(err)
							{
								return cb(err,null);
							}
							else
							{
								console.log("Result after update",result);
								return cb(null,result);
							}
						})		

				
				
					}


				})
			}
		})
	},

//This method will filter post according to options 
	filterPostByOption:function(data,cb)
	{
		var fields = data.field;
		console.log("data received",fields);
		var query = postSchema.find({}).sort({[fields]:-1});
		query.exec(function(err,result)
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