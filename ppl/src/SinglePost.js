import React from 'react';
import Header from './Header.js';
import {Route} from 'react-router-dom';

class SinglePost extends React.Component
{

	constructor(props)
	{
		super(props)
		this.state={

			post:[],
			comment:'',
			comments:[],
			likes:[]
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleComment= this.handleComment.bind(this);
		this.initalizePost = this.initalizePost.bind(this);
	}

// This method handles the text changes in input boxes and set the latest values in to the respective states 
	handleChange(key,e)
	{
		console.log("key",key);
		console.log("value",e.target.value);
		this.setState({[key]:e.target.value})

	}
// This method will save the commnet into the database
	handleComment(e)
	{

		console.log("comment value",this.state.comment);
		var comment = this.state.comment
		console.log("user name",localStorage.getItem("username"));
		var user = localStorage.getItem("username");
		let options = {

			headers:{

				"Accept":"application/json",
				"Content-Type":"application/json"
			},
			method:"Post",
			body:JSON.stringify({id:this.state.post._id,text:comment,user:user})
		}
		console.log("Fetch Call to post Comment",options);
		fetch("http://localhost:8085/post/saveComment",options)
		.then((res)=>{
			console.log(res);
			return res.json();
		})
		.then((response)=>{console.log("Response from post Comment--",response)
			this.initalizePost()
		})
		.catch((err)=>console.log(err))

	}
	// This method will Intialize the post array
	initalizePost()
	{
		let options ={
			headers:{
				"Accept":"application/json",
				"Content-Type":"application/json"
			},
			method:"post",
			body:JSON.stringify({id:this.props.match.params.id})
		}
		console.log("Fetching single post");
		fetch("http://localhost:8085/post/single",options)
		.then((res)=> {console.log(res);
				return res.json()
		})
		.then((response)=>{console.log("Single Post response",response);this.setState({post:response.results})
			this.setState({comments:this.state.post.comments,likes:this.state.post.likes})
			console.log("Comments in response",this.state.comments);

		})
		.catch((err)=> console.log(err))
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
		this.initalizePost()
	}

	render(){

			{console.log("props of singlepost",this.props)}
			{console.log("Post result",this.state.post)}
			var arr = this.state.post
			var cmntArray = arr.comments;
			{console.log(cmntArray)}
			const tt = "dsfdsgdsg";
			{console.log("Comments state",this.state.comments)}
		    return (
			      <div>
			      <Route path='/singlepost/' component={Header}/>
			      <div className="container">
			        <div className="content">
			          <div className="div_a">
			            <div className="div_title">{this.state.post.title}</div>
			            <div className="btm_rgt">
			              <div className="btm_arc">{this.state.post.category}</div>
			            </div>
			            <div className="div_top">
			              <div className="div_top_lft"><img src="/images/img_6.png" />{this.state.post.username}</div>
			              <div className="div_top_rgt"><span className="span_date">{this.state.post.date}</span><span className="span_time">{this.state.post.time}</span></div>
			            </div>
			            <div className="div_image"><img src={`http://localhost:8085/${this.state.post.imagefile}`} alt="pet" /></div>
			            <div className="div_btm">
			              <div className="btm_list">
			                <ul>
			                  <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
			                  <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
			                  <li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{this.state.likes.length} Likes</a></li>
			                  <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.comments.length} Comments</a></li>
			                </ul>
			              </div>
			            </div>
			          </div>
			        </div>
			        <div className="contnt_3">
			          <ul>
			           
			           {console.log("this is the state of the comments",this.state.comments)};
						{this.state.comments.map((x)=>	
						 <li>
					            <div className="list_image">
					              <div className="image_sec"><img src="/images/post_img.png"/></div>
					              <div className="image_name">{x["user"]}</div>
					            </div>
					            <div className="list_info">
									{x["text"]}
					            </div>
					            <input type="button" value="Reply" className="orng_btn"/>
					             </li>
					          )}
					         
			            <li>
			              <div className="cmnt_div">
			                <input type="text" className="cmnt_bx" defaultValue="Add Comment" onChange={this.handleChange.bind(this,"comment")} />
			                <input type="submit" className="sub_bttn" defaultValue="Submit Comment" onClick={this.handleComment}/>
			              </div>

			            </li>
			          </ul>
			          <div className="view_div"><a href="#">View more</a></div>
			        </div>
			        </div>
			      </div>
    );
	}
}

export default SinglePost;