import React from 'react';
import Dropzone from 'react-dropzone';

class postForm extends React.Component{

  constructor(props)
  {
    super(props);
  }
	render(){
		return(

      		<div>
      		    <div className="contnt_2">
                     <div className="login_sec">
                      <h1>New Post</h1>
                   <form  id="Uploadform" encType="multipart/form-data" >
                      <ul>
                        <li><span>Title</span><input type="text" id="tt" ref="title" name="title" placeholder="Enter title" onChange={this.props.change.bind(this,"title")} /></li>
                        <li><span>Category</span><input type="text" ref="category" name="category" placeholder="Enter category" onChange={this.props.change.bind(this,"category")}/></li>
                        <li><Dropzone onDrop={this.props.drop.bind(this)} accept="image/jpeg, image/png" name="imagefile">
                      	<p>Choose a file</p>
                    	  </Dropzone></li>
                        <h3>{this.props.message}hh</h3>
                        <span><input type="button" defaultValue="Save" onClick={this.props.savepost.bind(this)}/><input style={{marginLeft:'20px'}} type="button" defaultValue="Close" onClick={this.props.oncloses}/></span>
                      </ul>
                     </form>
                    </div>
                  </div>

      		</div>

			);

	}


}

export default postForm;