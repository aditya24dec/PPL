var express = require('express');
var postRouter = express.Router();
var postapi = require('../api/postApi.js');
var multer = require("multer");
var path = require('path');

var storage = multer.diskStorage({
	destination:function(req,file,cb) {
		cb(null,'./upload');
	},
	filename:function(req,file,cb) {
				console.log("It is file name",file.originalname);
		cb(null,file.originalname);
	}
})

var upload = multer({storage: storage})

// This function will save the post info
postRouter.post('/save',upload.single("imagefile"),function(req,res){

	var bodyData = req.body;
	var fileData = req.file;
	console.log("Save post invoked");
	console.log("Save post data",req.body);
	console.log("file---",req.file);
		
	if(bodyData.title.length==0)
	{
		res.send({msg:"Title can not be blank"});
	}else if(fileData==undefined)
	{
		res.send({msg:"Please select an image"});
	}else if(req.body.category=="Select")
	{
		res.send({msg:"Please select a Category"});
	}
	else
	{
		req.body.imagefile = req.file.originalname;
		postapi.savePost(req.body,function(err,result){
			if(err)
			{
				res.send(err);
			}
			else
			{
				res.send({msg:"Post is saved successfully"});
			}

		})

	}
})

// This method will send all the posts as response
postRouter.get('/getPost',function(req,res)
{
	console.log("Fetching posts......");
	postapi.getPost(req.body,function(err,result){
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send({results:result});
		}
	})

})

// This method will send filter post according to choosen category
postRouter.post('/filterPost',function(req,res)
{	
	console.log("Filtering Record");
	console.log("Category for filter",req.body);
	postapi.filterPost(req.body,function(err,result)
	{
		if(err)
		{
			res.send(err);
		}
		else
		{
			console.log("Filter record are sent");
			res.send({results:result});
		}
	})

})

// This function will send the selected post details
postRouter.post('/single',function(req,res)
{
	console.log("Single post call");
	console.log("data received--",req.body);
	postapi.singlePost(req.body,function(err,result){
		if(err)
		{
			res.send(err);
		}
		else
		{
				res.send({results:result});
		}
	})
})

// This method will save the commen into the database
postRouter.post('/saveComment',function(req,res)
{
	console.log("Save Comment call receive");
	console.log("Commnet to be save--",req.body);
	postapi.saveComment(req.body,function(err,result){
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send({msg:"comment is saved"});
		}
	})

})

// This method will save the likes into the database
postRouter.post('/like',function(req,res)
{
	console.log("Like call recevied");
	console.log("user who liked",req.body);
	postapi.saveLike(req.body,function(err,result){
		if(err)
		{
			res.send(err);
		}
		else if(result == "Liked already" )
		{
			res.send({msg:"You have already liked this post"});
		}else if(result=="Unliked already"){
			res.send({msg:"You have unliked this post"});
		}
		else
		{
			res.send({msg:"You liked"});
		}

	})
})

// This method will save the unlikes of  the post inti database
postRouter.post('/unlike',function(req,res)
{
	console.log("unLike call recevied");
	console.log("user who unliked",req.body);
	postapi.saveUnLike(req.body,function(err,result){
		if(err)
		{
			res.send(err);
		}
		else if(result=="Unliked already")
		{
			res.send({msg:"You have already Unliked this post"});
		}
		else if(result=="Liked already")
		{
			res.send({msg:"You have liked this post"});
		}
		else
		{
			console.log(result);
			res.send({msg:"You Unliked"});
		}

	})
})

// This will send  the record filtered according to the choosen option
postRouter.post('/filterPostByOption',function(req,res)
{
	console.log("most commnet called");
	console.log("This is the filter option",req.body);
	postapi.filterPostByOption(req.body,function(err,result){
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send({results:result});
		}

	})
})

module.exports=postRouter