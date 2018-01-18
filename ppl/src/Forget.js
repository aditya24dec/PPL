import React from 'react';
import $ from 'jquery';
import { Switch, Route } from 'react-router-dom';

class Forget extends React.Component{

	constructor(props)
	{
		super(props);
		this.state={
			email:'',
			error:'',
			pop:''
		}

		this.handleForget = this.handleForget.bind(this);
		this.handleOK = this.handleOK.bind(this);

	}

	// This will make popup close
	handleOK()
	{
		this.setState({pop:''});
	}

	componentWillMount()
	{
		// This code will redirect the user to login page if he tries to open the pages by using urls
	    console.log("Email id ",localStorage.getItem("emailId"));
	    let user = localStorage.getItem("username");
	    console.log("User name",user);
	    if(user==null)
	    {
	      this.props.history.push('/login');
	    }
	}

	componentDidUpdate(){

		console.log("Forget component did update");
		<script type="text/javascript">
				$(document).ready(function() {
				  $('#rght_cat_bg').click(function() {
				      $('.rght_list').toggle("slide");
				  })
				});

				$(document).ready(function() {
				  $('#opn_cat_bg').click(function() {
				      $('.sub_dwn').toggle("slide");
				  })
				});



				$(document).ready(function() {
				  $('#clos_pop').click(function() {
				      $('#pop_forgt').toggle("slide");
				  })
				})
		</script>

	}

	// This method handles the text changes in input boxes and set the latest values in to the respective states 
	handleEmail(key,e)
	{
		this.setState({[key]:e.target.value});
	}

	//This method will send the email containing random passowrd to the registered email-id  
	handleForget(e)
	{
		
		console.log(this.refs.email.value);
		
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(this.state.email.length <=0)
		{
			this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Email name can't be empty</div>});
		}
		else if(!re.test(this.state.email))
		{
             this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Enter valid email</div>});
      	}
      	else
      	{
			this.setState({error:''})
			e.preventDefault();
			let options ={
				headers:{
					'Accept':'application/json',
					'Content-type':'application/json'
				},
				method:'post',
				body:JSON.stringify(this.state)
			}
			console.log("Fetch call for Forget password",options);
			fetch("http://localhost:8085/user/forget",options).then((response)=>{
			console.log("this is the response from Server",response);
			if(response.status==200)
			{
				response.json().then((message)=>{
				console.log("Message--",message.msg);
				if(message.msg=="email id does not exist")
				{
					this.setState({error:<div style={{color:'red',fontSize:'15px'}}>{message.msg}</div>})
				}
				else
				{
					this.setState({pop:	<div className="popup_sec" id="pop_forgt">
				       						<div className="clos_btn"><img src="images/clos.png" alt id="clos_pop" /></div>
				       					 		<div className="pop_hdr">A mail has been send to your e-mail Id for Reset Password Link</div>
				       					 		<div className="man_contnt">
				          						<span>{message.msg}</span>
				        			  			<input type="button" value="OK" onClick={this.handleOK}/>
				      			  			</div>
				   				 		</div>
									})
				}	

					})
			}else
			{
				response.text().then((text)=>{})
			}

			}).catch((err)=>{

			})

		}
	}


	render()
	{
		return(
			<div>
				{this.state.pop}
				<div className="container">
				    <div className="content">
					    <div className="content_rgt">
				            <div className="register_sec">
				            <h1>Forgot Password</h1>
				    	        <ul>
				        	        <li><span>Enter E-mail ID</span><input type="email" ref="email" placeholder="User@gmail.com" onChange={this.handleEmail.bind(this,"email")}/></li>
				            	    {this.state.error}
				                	<li><input type="button" value="submit" onClick={this.handleForget}/></li>
				                </ul>
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

export default Forget;