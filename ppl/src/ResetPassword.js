import React from 'react';
import Header from './Header.js';
import {Route} from 'react-router-dom';

class ResetPassword extends React.Component
{
	constructor(props)
	{
		super()
		this.state={

			newPass:'',
			cnfrmPass:'',
			message:'',
			email:''

		}
		this.handleChange = this.handleChange.bind(this);
		this.saveNewPassword = this.saveNewPassword.bind(this);
	}

 // This method handles the text changes in input boxes and set the latest values in to the respective states  
  handleChange(key,e)
  {
    this.setState({message:''})
    console.log("key",key);
    console.log("value",e.target.value);
    this.setState({[key]:e.target.value});
  }

  componentWillMount()
  {
  	// This code will redirect the user to login page if he tries to open the pages by using urls
    let user = localStorage.getItem("username");
    console.log("User name",user);
    if(user==null)
    {
      this.props.history.push('/login');
    }

  	this.setState({email:localStorage.getItem("emailId")})
  }

  saveNewPassword()
  {
  	console.log("Email",localStorage.getItem("emailId"));
  	let options = {
  		headers:{

  			"Accept":"application/json",
  			"Content-Type":"application/json"
  		},
  		method:"post",
  		body:JSON.stringify(this.state)
  	}
// This will check for the password match
  	if(this.state.newPass==this.state.cnfrmPass)
  	{
  		console.log("Reset pass fetch call invoked",options);
  		fetch("http://localhost:8085/user/resetPass",options)
  		.then((res)=> {
  			console.log("res--",res);
  			return res.json();
  		})
  		.then((response)=> {console.log("Reset Password:-Response from server",response);this.setState({message:response.msg})})
  		.catch((err)=> console.log(err))
  	}
  	else
  	{
  		this.setState({message:"Password should be match"})
  	}
  }


	render(){

		return(

				<div>
				<Route path='/resetPass' component={Header}/>
				      <div className="container">
				        <div className="content">
				          <div className="content_rgt">
				            <div className="login_sec">
				              <h1>Reset Password</h1>
				              <ul>
				                <li><span>Enter New Password</span><input type="password" placeholder="Enter your new password" onChange={this.handleChange.bind(this,"newPass")}/></li>
				                <li><span>Confirm Password</span><input type="password" placeholder="Enter your password again" onChange={this.handleChange.bind(this,"cnfrmPass")} /></li>
				                <h4 style={{'color':'red'}}>{this.state.message}</h4>
				                <li><input type="submit" defaultValue="Submit" onClick={this.saveNewPassword} /></li>
				              </ul>
				            </div>
				          </div>
				          <div className="content_lft">
				            <h1>Welcome from PPL!</h1>
				            <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
				            <img src="images/img_9.png" alt /> </div>
				        </div>
				      </div>
				</div>



			)
	}
}

export default ResetPassword;