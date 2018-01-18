var UserSchema = require('../schema/userSchema.js')

module.exports = {

// This will save the new user
	addinguser:function(data,cb)
	{
		UserSchema.find({email:data.email},function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else if(result.length)
			{
				return cb(null,"userExist");
			}
			else
			{
				UserSchema.create(data,function(err,res)
				{
					console.log("user is being saved");
					if(err)
					{
						return cb(err,null);
					}
					else
					{
						return cb(null,"Record Saved");
					}

				})
			}
		})
	},

//This will authenticate the user 
	loginUser:function(data,cb)
	{
		UserSchema.findOne({email:data.email , password:data.password},function(err,result)
		{
			if(err)
			{
				return(err,null);
			}
			else if(result)
			{
				return cb(null,result);
			}
			else
			{
				return cb(null,"Invalid");
			}

		})
	},

//This method will check the email exist or not 
	forgetPassword:function(data,cb)
	{
		UserSchema.findOne({email:data.email},function(err,result)
		{
			if(err)
			{
				return(err,null);
			}
			else if(result)
			{
				return cb(null,result);
			}
			else
			{
				return cb(null,"NotExist");
			}
		})
	},

// This method will save the random password into the record of user
	randomPassword:function(data,cb)
	{
		UserSchema.update({email:data.email},{password:data.password},{upsert:true},function(err,result)
		{
			if(err)
			{
				return cb(err,null);
			}
			else
			{
				console.log("updated result",result);
				return cb(null,result);
			}
		})

	},

	userInfo:function(data,cb)
	{
		console.log("User Info for--",data.email);
		UserSchema.find({email:data.email},function(err,result){

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
	userImage:function(data,cb)
	{
		console.log("user image name",data.userImage);
		UserSchema.update({email:data.email},{userImage:data.userImage},{upsert:true},function(err,result)
		{

			if(err)
			{
				return cb(err,null);
			}
			else
			{
				console.log("Image upload Result",result);
				return cb(null,result);
			}
		})
	},

	updateUser:function(data,cb)
	{
		
		UserSchema.update({email:data.email},{firstname:data.firstname,lastname:data.lastname,username:data.username,desc:data.desc},{upsert:true},function(err,result)
		{

			if(err)
			{
				return cb(err,null);
			}
			else
			{
				console.log("Record Updated Result",result);
				return cb(null,result);
			}
		})
	},
	resetPass:function(data,cb)
	{
		UserSchema.update({email:data.email},{password:data.newPass},function(err,result){

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