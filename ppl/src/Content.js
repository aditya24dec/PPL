import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Forget from './Forget';
import Home from './Home';
import Header from './Header';
import App from './App.js';
import ForgetPop from './ForgetPop';
import SinglePost from './SinglePost';
import ScrollPost from './Scrollpost.js'
import TimeLine from './timeline.js';
import ResetPassword from './ResetPassword.js';

class Content extends React.Component{

	render(){	
		
		return(
			<div>
				<Switch>
					
					<Route exact path='/' component={Login}/>
					<Route path='/signup' component={Signup}/>
					<Route path='/login' component={Login}/>
					<Route path='/forget' component={Forget}/>
					<Route path='/home' component={Home} />
					<Route path='/singlepost/:id' component={SinglePost} />
					<Route path='/forgetpop' component={ForgetPop} />
					<Route path='/logout' component={Login} />
					<Route path='/header' component={Header} />	
					<Route path='/scroll' component={ScrollPost} />	
					<Route path='/timeline' component={TimeLine} />	
					<Route path='/resetPass' component={ResetPassword} />
				</Switch>
			</div>
		);
	}

}

export default Content;