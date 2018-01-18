import React from 'react';
import Dropzone from 'react-dropzone';

class PopupForm extends React.Component{



	render(){

		const msg = (this.props.message)
		return (

			<div className="popup_sec" style={{height:"auto","zIndex":'1'}}  id="pop_forgt">
			  	<div className="clos_btn"><img src="./images/clos.png"   alt="" id="clos_pop" onClick={this.props.onclose}/></div>
				<hr/>
			  	<div className="login_sec" style={{marginTop:'-50px'}}>
			    	<h1>New Post</h1>
             <form  id="Uploadform" encType="multipart/form-data" >
                <ul>
                  <li><span>Title</span><input type="text" id="tt" ref="title" name="title" placeholder="Enter title" onChange={this.props.change.bind(this,"title")} /></li>
                  <li><span>Category</span><select name="category">
                  	<option>Select</option>
                  	{
                  		this.props.catArray.map((x)=>
                  			<option>{x["catName"]}</option>

                  			)
                  	}

                  </select></li>
                  <li><Dropzone className="dropZone" onDrop={this.props.drop.bind(this)} accept="image/jpeg, image/png" name="imagefile">
                	<p>Choose a file</p>
              	  </Dropzone></li>
              	  <h4 style={{color:'red'}}>{msg}</h4>
                  <span><input type="button" defaultValue="Save" onClick={this.props.savepost.bind(this)}/><input style={{marginLeft:'20px'}} type="button" defaultValue="Close" onClick={this.props.onclose}/></span>
                </ul>
               </form>
			 	</div>
			 </div> 





			);
	}


}

export default PopupForm;