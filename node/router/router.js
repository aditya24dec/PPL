var express = require('express');
var router = express.Router();
var api = require('../api/api.js');
var nodemailer = require('nodemailer');
var localStorage = require('localStorage');
var multer = require("multer");
var path = require('path');

var storage = multer.diskStorage({
	destination:function(req,file,cb) {
		cb(null,'./userPhotos');
	},
	filename:function(req,file,cb) {
				console.log("It is file name",file.originalname);
		cb(null,file.originalname);
	}
})

var upload = multer({storage: storage})

/*this function will save save the new user if user will not already exist*/
router.post('/signup',function(req,res){
console.log("Data from fetch call-----------",req.body);

		api.addinguser(req.body,function(err,result){


				if(err)
				{
					res.send(err);
				}
				else if(result=="userExist")
				{
					res.send({msg:"Email Already Exist"});
					console.log("Email Already Exist");
				}
				else {

					res.send({msg:"Registration is successfull"});
					console.log("Registration is successfull");
				}



		})


})


/*thi  function will check the username and password and login the user*/

router.post('/login',function(req,res){

	console.log("Login called");
	console.log("Login values------",req.body);

	api.loginUser(req.body ,function(err,result){


		if (err) {
			res.send(err);
		}
		else if (result!="Invalid") {
			console.log(result);
			console.log("Login Successfull");
			localStorage.setItem("userName",result.firstname);
			res.send({msg:"Login Successfull",name:result.firstname+" "+result.lastname ,admin:result.admin});
		}else{

			console.log("Invald username or password");
			res.send({msg:"Invalid username or password"});
		}

	})



})


// This function will send random passowrd ot the registered email
router.post('/forget',function(req,res){

	console.log("Forget call invoked");
	console.log("Email requested:--",req.body);

	api.forgetPassword(req.body,function(err,result){


		console.log("Result from db",result.email);
		if(err)
		{
			res.send(err);
			
		}else if(result=="NotExist"){

			console.log("email id does not exist");
			res.send({msg:"email id does not exist"});
		}
		else{

			console.log("Email has been sent");
			// res.send({msg:"Email has been sent"});
			var x = Math.floor((Math.random() * 1000000) + 1);
			var globEmail=result.email;
			result.password=x;
			api.randomPassword(result,function(err,result){

				
					if(err){

						res.send(err);
					}
					else
					{
						console.log(result);
						var transporter = nodemailer.createTransport({

							service:"gmail",
							host:"smtp.gmail.com",
							auth:{

									user:'nukkadspices@gmail.com',
									pass:'aditya2415'
							}
						});

						var mailoption={
							to:globEmail,
							subject:"Forget Password",
							html:"<h1>Please login with the randomly generated password<h1/><br/><h2>Password:"+x+"</h2><br/><a href='http://localhost:3000/login'>Click here to login<a/>"
							
						};

						transporter.sendMail(mailoption,function(err,result1){

								if(err){

									res.send(err);
								}
								else
								{
									res.send({msg:"Email has been sent"})
								}

						})
					}


			})

		}

	})
})

router.post('/userinfo',function(req,res){


	console.log("user info called");
	api.userInfo(req.body,function(err,result){

		if(err)
		{
			res.send(err);
		}
		else{
			res.send({results:result});
		}


	})

})

router.post('/saveImage',upload.single("userImage"),function(req,res){


	console.log("user Image called and the body data is--",req.body);
	console.log("file",req.file);
	req.body.userImage = req.file.originalname;
	api.userImage(req.body,function(err,result){

		if(err)
		{
			res.send(err);
		}
		else{
			res.send({msg:"Image uploaded"});
		}


	})

})

router.post('/updateUser',upload.single("userImage"),function(req,res){


	console.log("update user called and the body data is--",req.body);
	api.updateUser(req.body,function(err,result){

		if(err)
		{
			res.send(err);
		}
		else{
			res.send({msg:"Record Updated"});
		}


	})

})

router.post('/resetPass',function(req,res){

	console.log("Reset Password call received");
	console.log("Data Recived--",req.body);
	api.resetPass(req.body,function(err,result){

		if(err)
		{
			res.send(err);
		}
		else{
			res.send({msg:"Password has been changed"});
		}

	})
})


module.exports = router;