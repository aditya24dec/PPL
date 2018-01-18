import React from 'react';

class EditUser extends React.Component
{

	constructor(props)
	{
		super(props)
		this.state={

			user:[],

		}
	}
	componentWillMount()
	{
		this.setState({user:this.props.userArray});
	}


	render(){

		return(

			<div className="popup_sec" style={{height:"auto","zIndex":'1'}}  id="pop_forgt">
			  	<div className="clos_btn"><img src="./images/clos.png"   alt="" id="clos_pop" onClick={this.props.onclose}/></div>
			   	<hr/>
			  	<div className="login_sec" style={{marginTop:'-50px'}}>
  			    <h1>User Details</h1>
              <form  id="UpdateUser" encType="multipart/form-data" >
                <ul>
                  <li><span>First Name</span><input type="text" ref="firstname"  name="firstname" onChange={this.props.change.bind(this,"firstname")} value={this.props.first}/></li>
                  <li><span>Last Name</span><input type="text"  ref="lastname"  name="lastname" onChange={this.props.change.bind(this,"lastname")} value={this.props.last}/></li>
                  <li><span>User Name</span><input type="text"   ref="username" name="username"  onChange={this.props.change.bind(this,"username")} value={this.props.user}/></li>
                  <li><span>Description</span><input type="text"  ref="desc"  name="desc"  onChange={this.props.change.bind(this,"desc")} value={this.props.desc}/></li>   
   					<h4  style={{color:'red'}}>{this.props.message}</h4>
   					<li><span><input type="button" defaultValue="Update" onClick={this.props.updateUser} /><input style={{marginLeft:'20px'}} type="button" defaultValue="Close" onClick={this.props.onclose} /></span></li>
                </ul>
              </form>
			   	</div>
			</div> 
			)
	}
}

export default EditUser