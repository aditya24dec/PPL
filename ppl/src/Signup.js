import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import HeaderLogout from './Headerloggedout.js'

class Signup extends React.Component{
  
    constructor(props)
    {
      super(props);

      
     
      this.state={


        username:'',
        password:'',
        email:'',
        firstname:'',
        lastname:'',  
        error:''
      }

      this.handleSubmit = this.handleSubmit.bind(this);

    };

// This method handles the text changes in input boxes and set the latest values in to the respective states 
    handleChange(key,e)
    {
      this.setState({error:''})
      console.log('key',key);
      console.log('e',e.target.value);
      this.setState({[key]:e.target.value})
    }

    handleSubmit(e)
    {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.state.username.length <=0)
      {
        
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Username name can't be empty</div>});
      
      }
      else if(this.state.password.length <=0)
      {
   
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Password can't be empty</div>});

      }
      else if(this.state.email.length <=0)
      {
        
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Email can't be empty</div>});
      
      }
      else if(!re.test(this.state.email))
      {
      
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Enter valid email</div>});
     
      }
      else if(this.state.firstname.length <=0)
      {
        
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Firstname can't be empty</div>});
    
      }
      else if(this.state.lastname.length <=0)
      {
  
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Lastname can't be empty</div>});

      }
      else if(this.refs.check.checked==false)
      {
      
        this.setState({error:<div style={{color:'red',fontSize:'15px'}}>*Please Accept the terms and Contions</div>});
      
      }
      else{

        this.setState({error:''});
        e.preventDefault();
        let options = {

          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          method:'Post',
          body:JSON.stringify(this.state)

        }
        console.log("Calling fetch",this.state);
        fetch("http://localhost:8085/user/signup",options).then((response) => {
        console.log("this is the response",response);
        if(response.status == 200) {
          response.json().then((userData) => {
            console.log("userData---",userData.msg);
            this.setState({error:<div style={{color:'red',fontSize:'15px'}}>{userData.msg}</div>});
          })
        } else {
          response.text().then((text) => {
              
          })
        }
      })
      .catch((err) => {
        console.log("err", err);
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
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li><span>Username</span><input type="text" ref ="username"  onChange={this.handleChange.bind(this,"username")} placeholder="Enter your username" /></li>
                  <li><span>Password</span><input type="text" ref="password" onChange={this.handleChange.bind(this,"password")} placeholder="Enter your password" /></li>
                  <li><span>Email</span><input type="email" ref="email" onChange={this.handleChange.bind(this,"email")} placeholder="Enter your email" /></li>
                  <li><span>First Name</span><input type="text" ref="firstname" onChange={this.handleChange.bind(this,"firstname")} placeholder="Enter your first name" /></li>
                  <li><span>Last Name</span><input type="text" ref="lastname" onChange={this.handleChange.bind(this,"lastname")} placeholder="Enter your last name" /></li>
                  <li><input type="checkbox" value="" ref="check" />I agree to Term &amp; Conditions</li>
                  <label>{this.state.error}</label>
                  <li><input type="submit" defaultValue="Register" onClick={this.handleSubmit} /></li>
                </ul>
                <div className="addtnal_acnt">I already have an account.<Link to='/login'>Login My Account !</Link></div>
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

export default Signup;