import React from 'react';
import Dropzone from 'react-dropzone';

class CreateCat extends React.Component{


	constructor(props)
	{
		super(props);
		this.state = {

			accepted: [],
      rejected: [],
      path:"",
      message:""
		}


	}
      
  // Drop method for the dropZone
  drop(accept,reject) 
  {
    var pathh = accept[0].preview;
    console.log("path",pathh);
    this.setState({ path: pathh});
    console.log("this.state",this.state);
  }
// This method wills ave the new category into the database
  handleSubmitCat(e)
  {
    try{
        e.preventDefault();
        var f = document.getElementById("UploadCat");
        console.log("f",f);
        var ff = new FormData(f);   
        ff.append("file",this.state.path);
        var options = {
          mode: 'cors',
          headers: {
            "Accept" : "application/json"
          },
          method: "POST",
          body: ff
        }
        console.log("Fetch call for save category", options);
        fetch("http://localhost:8085/cat/save",options)
        .then((res)=> {
          console.log("===> ",res);
          return res.json()
        })
        .then((response)=> {console.log("response",response);this.setState({message:response.msg})
        console.log(this.state.message);})
        .catch((err)=> console.log("error",err))


        }
    catch(err){ }
  }


  // This method is to change the error message to blank on change eevnt of input box
  handleChange(e)
  {
    this.setState({message:''});
  }


	render()
  {
		return(

			<div className="popup_sec" style={{height:"auto","zIndex":'1'}}  id="pop_forgt">
			  	<div className="clos_btn"><img src="./images/clos.png"   alt="" id="clos_pop" onClick={this.props.onCatClose}/></div>
			   	<hr/>
			  	<div className="login_sec" style={{marginTop:'-50px'}}>
  			    <h1>New Category</h1>
              <form  id="UploadCat" encType="multipart/form-data" >
                <ul>
                  <li><span>Category Name</span><input type="text" id="catName" ref="catName" name="catName" placeholder="Enter Category" onChange={this.handleChange.bind(this)} /></li>
                  <li><Dropzone className="dropZone" onDrop={this.drop.bind(this)} accept="image/jpeg, image/png" name="catImage">
                  <p>Choose a file</p>
                	</Dropzone></li>
                	<h4 style={{color:'red'}}>{this.state.message}</h4>
                  <span><input type="button" defaultValue="Save" onClick={this.handleSubmitCat.bind(this)} /><input style={{marginLeft:'20px'}} type="button" defaultValue="Close" onClick={this.props.onCatClose} /></span>
                </ul>
              </form>
			   	</div>
			</div> 
			   );

	}

}

export default CreateCat;