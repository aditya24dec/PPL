import React from 'react';
import PostForm from './postForm.js';
import Dropzone from 'react-dropzone';
import PopupForm from './Popup';
import Child from './child.js';
import AllPost from './AllPost.js';
import CategoryList from './CategoryList.js';
import CreateCat from './CreateCat.js';
import CatCrudTray from './CatCrudTray.js';
import InfiniteScroll from 'react-infinite-scroller';
import LimitedInfiniteScroll from 'react-limited-infinite-scroll'
import Header from './Header.js';
import {Route} from 'react-router-dom';

class Home extends React.Component{

  constructor(props)
  {
    super(props);
    this.state={
      visible:false,
      accepted: [],
      rejected: [],
      path:"",
      loginStatus:false,
      popup:false,
      message:'',
      post:[],
      cat:[],
      hasMore:true,
      isAdmin:false,
      catTray:false,
      target:'',

    }

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onTrayOpen = this.onTrayOpen.bind(this);
    this.onTrayClose = this.onTrayClose.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setCatState = this.setCatState.bind(this);
    this.setFilterPost = this.setFilterPost.bind(this);
    this.updateLikes = this.updateLikes.bind(this);
    this.setIntialPost= this.setIntialPost.bind(this);
    this.updateUnLikes = this.updateUnLikes.bind(this);
    this.postFilterOptions = this.postFilterOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  // Drop method for dropZone
  drop(accept,reject)
  {
    var pathh = accept[0].preview;
    console.log("path",pathh);
    this.setState({ path: pathh});
    console.log("this.state",this.state);
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
    console.log("Email id ",localStorage.getItem("emailId"));
    let user = localStorage.getItem("username");
    console.log("User name",user);
    if(user==null)
    {
      this.props.history.push('/login');
    }

    // Code to set unset isAdmin state
    console.log("this is the storage",localStorage.getItem("adminStatus"));
    let val = JSON.parse(localStorage.getItem("adminStatus"));
    console.log("val------",val);
    this.setState({isAdmin:val});
    console.log("Isadmin will mount",this.state.isAdmin);
    
    // To fetch all post from backend
    this.setIntialPost()

    // To fetch category
    console.log("Fetching Cat from will mount");
    fetch("http://localhost:8085/cat/getCat")
    .then((resp) => resp.json())
    .then((response) => {console.log("response of will mount",response);this.setState({cat:response.results})})
    .catch((err) => console.log(err))

  }

  // This will insialize the post array 
  setIntialPost()
  {
    console.log("Fetching post");
    fetch("http://localhost:8085/post/getPost")
    .then((resp) => resp.json())
    .then((response) => {console.log("response of will mount",response);this.setState({post:response.results})})
    .catch((err) => console.log(err))
  }

  // This method will filtered the post on the basisc of clickied category
  setFilterPost(e)
  {
    console.log("selected category",e.target.name);
    var catName = e.target.name;
    var options = {
      mode: 'cors',
      headers: {
       "Accept" : "application/json",
       "Content-Type":"application/json"
      },
      method: "post",
      body: JSON.stringify({catName:catName})
    }
    console.log("Fetch call for Set post filter", options);
    fetch("http://localhost:8085/post/filterPost",options)
    .then((resp) => resp.json())
    .then((response) => {console.log("response of will mount",response);this.setState({post:response.results})})
    .catch((err) => console.log(err))
  }

  // This method will initialize the category array
  setCatState()
  {
    console.log("setState Called");
    console.log("Fetching Cat from home setState");
    fetch("http://localhost:8085/cat/getCat")
    .then((resp) => resp.json())
    .then((response) => {console.log("response of will mount",response);this.setState({cat:response.results})})
    .catch((err) => console.log(err))
  }

  // This method will save the post into the database
  handleSavePost(e)
  {
    console.log(this.state.error);
    try{
        e.preventDefault();
        var f = document.getElementById("Uploadform");
        console.log("f",f);
        var ff = new FormData(f);
        ff.append("file",this.state.path);
        ff.append("time",new Date().toString("hh:mm tt"));
        ff.append("date",new Date().toString("dd MMM yyyy"));
        ff.append("username",localStorage.getItem("username"));
        var options = {
          mode: 'cors',
          headers: {
           "Accept" : "application/json"
          },
          method: "POST",
          body: ff
        }
        console.log("Fetch call for save post", options);
        fetch("http://localhost:8085/post/save",options)
        .then((res)=> {
          console.log("===> ",res);
          return res.json()
        })
        .then((response)=> {console.log("response",response);this.setState({message:response.msg})
          console.log(this.state.message);
          this.setIntialPost()
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
        this.setState({popup:false});
        console.log("OnClose called",this.state.popup);
        }
    catch(err){ }
  }

  // Function to delete category on delete popup
  handleClick(e)
  {
    var target = e.target.name;
    this.setState({target:target})
    this.setState({statusUpdate:true})
    var options = {
      mode: 'cors',
      headers: {
       "Accept" : "application/json",
       "Content-Type":"application/json"
      },
      method: "POST",
      body: JSON.stringify({target:e.target.name})
    }
    console.log("Fetch call to delete category", options);
    fetch("http://localhost:8085/cat/catDelete",options)
   .then((res)=> {
      console.log("===> ",res);
      return res.json()
    })
    .then((response)=> {console.log("response",response);
      this.setCatState();
    })
    .catch((err)=> console.log("error",err))
  }

// This function will open the CRUD tray
  onTrayOpen(e)
  {
    e.preventDefault();
    try{
        this.setState({catTray:true});
        console.log("OnCatTray called",this.state.catTray);
       }
    catch(err){}
  }

//This function will close the CRUD tray 
  onTrayClose(e)
  {
    e.preventDefault();
    try{
        this.setState({catTray:false});
        console.log("OnCatTray called",this.state.catTray);
       }
    catch(err){}
  }
      
  loadItem(page){




  }

//This method will filter the post --Most Commented/Most liked/Newest First 
  postFilterOptions(e)
  {
    console.log("this button is clicked",e.target.id);
    let filterOption = e.target.id;
    let options = {
      headers:{
       "Accept":"application/json",
       "Content-Type":"application/json"
      },
      method:"Post",
      body:JSON.stringify({field:filterOption})
    } 
    console.log("Fetching for moseCommented post",options);
    fetch("http://localhost:8085/post/filterPostByOption",options)
    .then((resp) => resp.json())
    .then((response) => {console.log("response of will mount",response);this.setState({post:response.results})})
    .catch((err) => console.log(err))

  }

// This method will save the username in like array of db and increment the number of likes in front end
  updateLikes(e)
  {
    let emailId = localStorage.getItem("emailId");
    let id = e.target.id;
    let options = {
      headers:{
       "Accept":"application/json",
       "Content-Type":"application/json"
      },
      method:"post",
      body:JSON.stringify({email:emailId,id:id})
    }
    console.log("Fetch call to like",options);
    fetch("http://localhost:8085/post/like",options)
   .then((res)=>{
      console.log(res);
      return res.json();
    })
   .then((response)=>{console.log("Reposne from like call",response);
      this.setIntialPost()
    })
   .catch((err)=>console.log(err))

  }
// This method will save the username in unlike array of db and increment the number of unlikes in front end
  updateUnLikes(e)
  {
    let emailId = localStorage.getItem("emailId");
    let id = e.target.id;
    let options = {
      headers:{
       "Accept":"application/json",
       "Content-Type":"application/json"
      },
      method:"post",
      body:JSON.stringify({email:emailId,id:id})
    }
    console.log("Fetch call to like",options);
    fetch("http://localhost:8085/post/unlike",options)
    .then((res)=>{
        
        console.log(res);
        return res.json();
    })
   .then((response)=>{console.log("Reposne from like call",response);
      
      this.setIntialPost()
    })
   .catch((err)=>console.log(err))

  }



	render()
  {

    {console.log("admin status---",this.state.isAdmin)}
    
    const loader = <div className="loader">Loading ...</div>;
    
    const {total , list} = this.state.post

    const item = this.state.post.map((x, key) => {
    return (
      <li key={key.toString()}><AllPost id={x["_id"]} postTitle={x["title"]} postDate={x["date"]} postTime={x["time"]} postCat={x["category"]} postImage={x["imagefile"]} postUser={x["username"]} comments={x["comments"]} likes={x["likes"]} unlikes={x["unlikes"]} updateLikes={this.updateLikes} updateUnLikes={this.updateUnLikes}/></li>

       )
    })

    {console.log("props value for categor",this.state)}

    const popups = (this.state.popup ? <PopupForm onclose={this.onClose} change={this.handleChange} savepost={this.handleSavePost} drop={this.drop} message={this.state.message} catArray={this.state.cat}/> : '');
		
    {console.log("this is the state",this.state)};
    
    const manageButton=(this.state.isAdmin ? <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#" onClick={this.onTrayOpen}>Manage Category</a> </div>: '');

    const cattray = (this.state.catTray ? <CatCrudTray onTrayClose={this.onTrayClose}  setCat={this.setCatState} catArray={this.state.cat} catDelete={this.handleClick}/>: '')

    {console.log("this is the cat tray",this.state.cat)}
    return (
      <div>
        <Route path='/home' component={Header}/>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#" onClick={this.onOpen}>Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              {manageButton}
              {cattray}
              <CategoryList catArray={this.state.cat} setFilter={this.setFilterPost}/>

              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                    <div className="btm_arc">Cats</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="images/lft_img.png" alt="image" /></div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          {popups}
          <div className="content_lft">
            <div className="contnt_1">
              <div className="list_1">
                <ul>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Friends</li>
                  <li>
                    <input type="checkbox" className="chk_bx" />
                    Flaged</li>
                </ul>
              </div>
              <div className="post_div">
                <div className="post_list">
                  <ul>
                    <li><a onClick={this.postFilterOptions} id="date"><span className="list_img"><img src="images/img_1.png" /></span>Newest First</a></li>
                    <li><a onClick={this.postFilterOptions} id="likes"><span className="list_img"><img src="images/img_4.png" /></span>Most Likes</a></li>
                    <li><a onClick={this.postFilterOptions} id="comments"><span className="list_img"><img src="images/img_5.png" /></span>Most Commented</a></li>
                  </ul>
              </div>
                <div className="post_txt">4 New Post Updates</div>
              </div>
            </div>
            <div className="contnt_2">
              <Route path='/home' render={()=> <AllPost updateLikes={this.updateLikes} updateUnLikes={this.updateUnLikes} postArray={this.state.post} /> } />
            </div>
          </div>
        </div>
        <div className="clear" />
        </div>
      </div>
    );
	}


}

export default Home;