var express = require('express');
var app = express()
var catRouter = express.Router();
var catApi = require('../api/catApi.js');
var multer = require("multer");
var path = require('path');

var storage = multer.diskStorage({
	destination:function(req,file,cb) {
		cb(null,'./Catupload');
	},
	filename:function(req,file,cb) {
				console.log("It is file name",file.originalname);
		cb(null,file.originalname);
	}
})

var upload = multer({storage: storage});


// This method will save the new category into the database
catRouter.post('/save',upload.single('catImage'),function(req,res)
{
	console.log("This is the body",req.body);
	console.log("this is the file",req.file);
	if(req.body.catName.length==0)
	{
		res.send({msg:"Category Name can not be empty"});
	}
	else if(req.file==undefined)
	{
		res.send({msg:"Please Select and image"});
	}
	else
	{
		req.body.catImage = req.file.originalname;
		catApi.saveCategory(req.body,function(err,result)
		{
			if(err)
			{
				res.send(err);
			}
			else
			{
				console.log("Category has been saved");
				res.send({msg:"Category has been saved"});
			}
		})
	}
})

// This method will send all the categories 
catRouter.get('/getCat',function(req,res)
{
	console.log("Fetching Category......");
	catApi.getCat(req.body,function(err,result)
	{
		if(err)
		{
			res.send(err);
		}
		else
		{
			console.log("Category are being loaded");
			res.send({results:result});
		}
	})

})

// This method will select the category
catRouter.post('/catDelete',function(req,res)
{
	console.log("The body data is ",req.body);
	catApi.catDelete(req.body , function(err,result)
	{
		if(err)
		{
			res.send(err);
		}
		else
		{
			console.log("data has been deleted",result);
			res.send({msg:"Category has been removed"});
		}

	})
})


module.exports=catRouter