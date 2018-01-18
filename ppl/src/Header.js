import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component{

	constructor(props)
	{
		super(props)

		this.state={
			loginStatus:false
		}

		this.logout = this.logout.bind(this);
	}
	//This method will logged out the user and redirect him to the login page
	logout()
	{
		console.log("logout called")
		localStorage.clear();
		this.props.history.push('/logout');
		
	}

	componentWillMount()
	{
		var user = localStorage.getItem("username");
		if(user!=null){
			this.setState({loginStatus:true})
		}
	}

	render()
	{
		{console.log("login status",this.state.loginStatus)}

		const drop= <div class="info_div">
			    		<div class="image_div"> <img src="/images/pic.png"/></div>
			    		<div className="dropdown" style={{marginTop:'5px',marginLeft:'20px',width:'180px'}}>
							<button className="btn btn-warning dropdown-toggle" type="button" data-toggle="dropdown">
								{localStorage.getItem("username")}   <span className="caret"></span></button>
							<ul className="dropdown-menu">
							    <li><a><Link to="/home">Home</Link></a></li>
							    <li><a><Link to="/timeline">Timeline</Link></a></li>
							    <li><a><Link to="/resetPass">Reset Password</Link></a></li>
							    <li><a href="#" onClick={this.logout}>Logout</a></li>
							</ul>
						</div>
    				</div>

		const logout = (this.state.loginStatus ? drop :'')

		return(

			<div>
				<div className="navbar navbar-inverse navbar-fixed-top">
		    	    <div className="navbar-inner">
			    	    <div className="container">
			        	    <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
			            	<a className="brand" href>PPL</a>
			              		<div className="pro_info pull-right">
			                		<div className="pro_icn"><img src="/images/pic_small.png" /></div>
			                		<div className="pro_txt">Me<b className="caret" /></div>
			                		<ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
			                  			<li><a tabIndex={-1} href="#">My Profile</a></li>
				                  		<li><a tabIndex={-1} href="#">Message Box</a></li>
				                  		<li><a tabIndex={-1} href="#">Change Language</a></li>
				                  		<li className="divider" />
				                  		<li><a tabIndex={-1} href="#"><input type="text" placeholder="search" /></a></li>
				                	</ul>
			              		</div>
			              		<div className="nav-collapse collapse">
			                		<ul className="nav">
				                  		<li className="active"> <a href>Home</a> </li>
				                  		<li className> <a href>E-Coupons</a> </li>
				                  		<li className> <a href>E-Brands</a> </li>
				                  		<li className> <a href>Resuse Market</a> </li>
				                  		<li className> <a href>Lost and Found</a> </li>
			                		</ul>
			            		</div>
			            </div>
			        </div>
			    </div>
			    <div className="header">
			        <div className="header_lft">
			    	    <div className="logo"><a href="#"><img src="/images/logo.png" /></a></div>
			            <div className="navigatn">
			        	    <ul>
			            	    <li><a href="" ><Link to="/home">Home</Link></a></li>
			                	<li><a href="#"> E-Coupons </a></li>
			                	<li><a href="#">E-Brands </a></li>
			                	<li><a href="#"> Resuse Market </a></li>
			                	<li><a href="#"> Lost and Found</a></li>
			            	</ul>
			            </div>
			        </div>
			        <div className="header_rgt">
			        	<div className="flag_div"><img src="/images/flag.png" /></div>
			        		<input type="text" placeholder="Search" className="txt_box" />
			        		<div className="msg_box"><a href="#"><span className="msg_count">100</span></a></div>
   							{logout}
			        	</div>
			        </div>
				</div>
				);

	}

}

export default Header;