import React from 'react';
import {Link} from 'react-router-dom';
import HeaderLogout from './Headerloggedout.js'

 class Login extends React.Component{

		constructor(props)
		{
			super(props);

			this.state={

				email:'',
				password:'',
				error:''
			}

			this.handleLogin = this.handleLogin.bind(this);
		}

		//this will clear the local storage on login page load
		componentWillMount()
		{
			localStorage.clear();
		}

		// This method handles the text changes in input boxes and set the latest values in to the respective states 

		handleChange(key,e){

			this.setState({error:''})
			console.log("key",key);
			console.log("value",e.target.value);
			this.setState({[key]:e.target.value})
		}

		// This method will authenticate the username and password

		handleLogin(e)
		{
			this.setState({error:''})
        	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if(this.state.email.length <=0){
				this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Username name can't be empty</div>});
			}
			else if(!re.test(this.state.email)){
             this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Enter valid email</div>});
      		}
      		else if(this.state.password.length <=0){
				this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Password name can't be empty</div>});
			}else{
				e.preventDefault();

			let options ={

				headers:{

					'Accept':'application/json',
					'Content-Type':'application/json'
				},
					method:'post',
					body:JSON.stringify(this.state)
			}
			console.log("Fetch call for Login", options);
			fetch("http://localhost:8085/user/login",options).then((response) =>{

					console.log("this is the response from login",response);
					if(response.status==200)
					{
						response.json().then((message)=>{

								console.log("props",this.props);
								console.log("msg ",message.msg);
								console.log("Name",message.name);
								console.log("Admin",message.admin);
								
								if(message.msg!="Invalid username or password")
								{
									localStorage.setItem("username",message.name);
									localStorage.setItem("adminStatus",message.admin);
									localStorage.setItem("emailId",this.state.email);
									this.props.history.push('/home');
								}
								console.log(localStorage.getItem("username"));
								this.setState({error:<div style={{color:'red',fontSize:'15px'}}>{message.msg}</div>})

								
						})
					}
					else {
						response.text().then((text)=>{
						})
					}

			})
			.catch((err)=>{

			})
			}
		}

		render(){

			 return (
				    <div>
				    	<HeaderLogout />
				        <div className="container">
				        	<div className="content">
				            	<div className="content_rgt">
				            		<div className="login_sec">
				            		<h1>Log In</h1>
				                	<ul>
				                		<li><span>Email-ID</span><input type="email" ref="email" placeholder="Enter your email-id" onChange={this.handleChange.bind(this,"email")}/></li>
				                		<li><span>Password</span><input type="password" ref="password" placeholder="Enter your password" onChange={this.handleChange.bind(this,"password")}/></li>
				                		<li><input type="checkbox" />Remember Me</li>
				                		{this.state.error}
				                		<li><input type="submit" defaultValue="Log In" onClick={this.handleLogin}/><Link to='/forget'>Forgot Password</Link></li>
				                	</ul>
				                	<div className="addtnal_acnt">I do not have any account yet.<Link to='/signup'>Create My Account Now !</Link></div>
				              		</div>
				            	</div>
				            	<div className="content_lft">
				            		<h1>Welcome from PPL!</h1>
				            		<p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
				              		<img src="images/img_9.png" alt /> </div>
				          		</div>
				        </div>
				        <div className="clear" />
				    </div>
			    	);
		}


}

export default  Login;