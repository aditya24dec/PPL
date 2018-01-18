import React from 'react';
import {Route} from 'react-router-dom';
import Header from './Header.js';
import EditUser from './EditUser.js';

class TimeLine extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state={

			user:[],
			file:'',
			message:'',
			popup:false,
			firstname:'',
			lastname:'',
			username:'',
			desc:'',
			message:''

		}

	
		this.imageUpload = this.imageUpload.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.onClose = this.onClose.bind(this);
		this.updateInfo = this.updateInfo.bind(this);
	}

	handleChange(key,e){

		this.setState({message:''})
		console.log("key",key);
		console.log("value",e.target.value);
		this.setState({[key]:e.target.value})
	}


// Function to initalize the user array
	initializeUser()
	{
		
		let emailId = localStorage.getItem("emailId");
	    let options = {
	      headers:{
	       "Accept":"application/json",
	       "Content-Type":"application/json"
	      },
	      method:"post",
	      body:JSON.stringify({email:emailId})
	    }
	    console.log("Fetch call to user info",options);
	    fetch("http://localhost:8085/user/userinfo",options)
	   .then((res)=>{
	      console.log(res);
	      return res.json();
	    })
	   .then((response)=>{console.log("Reposne from user info",response);
	      	this.setState({user:response.results[0],firstname:response.results[0].firstname,lastname:response.results[0].lastname,username:response.results[0].username,desc:response.results[0].desc})
	    })
	   .catch((err)=>console.log(err))

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
		this.initializeUser()
	}

// Function to upload images
	imageUpload(e)
	{
	    try{
	        e.preventDefault();
	        var f = document.getElementById("UploadImage");
	        console.log("f",f);
	        var ff = new FormData(f);
	        ff.append("email",localStorage.getItem("emailId"));
	        var options = {
	          mode: 'cors',
	          headers: {
	           "Accept" : "application/json"
	          },
	          method: "POST",
	          body: ff
	        }
	        console.log("Fetch call for save Image", options);
	        fetch("http://localhost:8085/user/saveImage",options)
	        .then((res)=> {
	          console.log("===> ",res);
	          return res.json()
	        })
	        .then((response)=> {console.log("response",response);this.setState({message:response.msg})
	          console.log(this.state.message);
	          this.initializeUser()
	        })
	        .catch((err)=> console.log("error",err))

	       }
	    catch(err){}


	}


  // Fucntion to open popup
  onOpen(e)
  {
    e.preventDefault();
    try{
        this.setState({popup:true});
        console.log("OnOpen called",this.state.popup);
        }
    catch(err){}
  }

  // Function to close popop
  onClose(e)
  {
    e.preventDefault();
    try{
        this.setState({popup:false,message:''});
        console.log("OnClose called",this.state.popup);
        }
    catch(err){ }
  }
// Function to update the user info
  updateInfo(e)
  {
  		    try{
	        e.preventDefault();
	        var f = document.getElementById("UpdateUser");
	        console.log("f",f);
	        var ff = new FormData(f);
	        ff.append("email",localStorage.getItem("emailId"));
	        var options = {
	          mode: 'cors',
	          headers: {
	           "Accept" : "application/json"
	          },
	          method: "POST",
	          body: ff
	        }
	        console.log("Fetch call for save Image", options);
	        fetch("http://localhost:8085/user/updateUser",options)
	        .then((res)=> {
	          console.log("===> ",res);
	          return res.json()
	        })
	        .then((response)=> {console.log("response",response);this.setState({message:response.msg})
	          console.log(this.state.message);
	          this.initializeUser()
	        })
	        .catch((err)=> console.log("error",err))

	       }
	    catch(err){}


  }



	render()
	{
    const EditPopup = (this.state.popup ? <EditUser onclose={this.onClose} change={this.handleChange} updateUser={this.updateInfo}  message={this.state.message} first={this.state.firstname} last={this.state.lastname} user={this.state.username} desc={this.state.desc}/> : '');


		{console.log("user info",this.state.user)}
		return(
				<div>
				<Route path = '/timeline' component={Header} />
  				{EditPopup}
				<div className="container">
			        <div className="content">
						   <div className="timeline_div">
						        <div className="timeline_div1">
						          <div className="profile_pic">
						            <img src={`http://localhost:8085/${this.state.user.userImage}`} />
						            <form  id="UploadImage" encType="multipart/form-data">
						            <div className="profile_text"><input type="file" name="userImage" onChange={this.handleChange.bind(this,"userImage")}/></div>
						            <button className="btn btn-warning btn-md" onClick={this.imageUpload}>Upload</button>
						            </form>
						          </div>
						          <div className="profile_info">
						            <div className="edit_div"><a onClick={this.onOpen}>Edit <img src="images/timeline_img.png" /></a></div>
						            <div className="profile_form">
						              <ul>
						                <li>
						                  <div className="div_name1">Name :</div>
						                  <div className="div_name2">{this.state.user.firstname+" "+this.state.user.lastname}</div>
						                </li>
						                <li>
						                  <div className="div_name1">Email :</div>
						                  <div className="div_name2">{this.state.user.email}</div>
						                </li>
						                <li>
						                  <div className="div_name1">Description :</div>
						                  <div className="div_name3">{this.state.user.desc}</div>
						                </li>
						              </ul>
						            </div>
						          </div>
						        </div>
						        <div className="timeline_div2">
						          <ul>
						            <li><a href="#" className="active">Timeline    </a></li>
						            <li><a href="#">About  </a></li>
						            <li><a href="#">Album</a></li>
						            <li><a href="#"> Pets</a></li>
						            <li><a href="#">My Uploads </a></li>
						          </ul>
						        </div>
						      </div>
						      </div>
						      </div>
							</div>

		)
	}
}

export default TimeLine