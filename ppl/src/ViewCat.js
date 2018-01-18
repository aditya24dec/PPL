import React from 'react';
import Dropzone from 'react-dropzone';
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom' 
import PropTypes from 'prop-types';

class ViewCat extends React.Component{


	constructor(props)
	{
		super(props);
		this.state={

			accepted: [],
            rejected: [],
            path:"",
            message:"",
		}


	}

  drop(accept,reject)
  {
    var pathh = accept[0].preview;
    console.log("path",pathh);
    this.setState({ path: pathh});
    console.log("this.state",this.state);
  }

	render(){

   	return(

			<div className="popup_sec" style={{height:"auto","zIndex":'1'}}  id="pop_forgt">
    	  	<div className="clos_btn"><img src="./images/clos.png"   alt="" id="clos_pop" onClick={this.props.onCatClose}/></div>
	   			<hr/>
		  	   <div className="login_sec" style={{marginTop:'-50px'}}>
			     <h1>View Category</h1>
            <table className="table">
              <thead  className="tHead">
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">Category Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.value.map((x,key)=>
                <tr >
                  <td><img src={`http://localhost:8085/${x["catImage"]}`} height="40px" width="40px"/></td>
                  <td>{x["catName"]}</td>
                  <td ><button name={x["catName"]} className="btn btn-md btn-danger" onClick={this.props.deleteCat}>Delete</button></td>
                </tr>
                )}               
              </tbody>
            </table>
			 	  </div>
			 </div> 
			);
	}

}

ViewCat.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ViewCat;