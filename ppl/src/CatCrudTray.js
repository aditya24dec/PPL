import React from 'react';
import  { Redirect } from 'react-router-dom'
import CreateCat from './CreateCat.js';
import ViewCat from './ViewCat.js';
import PropTypes from 'prop-types';

class CatCrudTray extends React.Component{

	constructor(props)
	{
		super(props)
		this.state ={

				create:false,
				view:false,

	   }

		this.CreateOpen = this.CreateOpen.bind(this);
    this.CreateClose = this.CreateClose.bind(this);
    this.ViewOpen = this.ViewOpen.bind(this);
    this.ViewClose = this.ViewClose.bind(this);
	}

  // This will open the Create popup
	CreateOpen(e)
  {
    e.preventDefault();
    try{
        this.setState({create:true});
        console.log("OnCatOpen called",this.state.Catpopup);
        }
    catch(err){}
  }

  // This will close the crreate Popup
  CreateClose(e)
  {
    e.preventDefault();
      try{
          this.setState({create:false});
          this.props.setCat();
          console.log("OnCatClose called",this.state.Catpopup);
          }
      catch(err){}
  }

  // This will open the view popup
  ViewOpen(e)
  {
    e.preventDefault();
    try{
        this.setState({view:true});
        console.log("View called",this.state.view);
        }
    catch(err){}
  }

  // This will close the view popup
  ViewClose(e)
  {
    e.preventDefault();
    try{
        this.setState({view:false});
        this.props.setCat();
        console.log("this is the rey",this.props);
        console.log("View called",this.state.view);
        }
    catch(err){}
  }

	render()
  {
	 const createPopup = (this.state.create ? <CreateCat onCatClose={this.CreateClose}/> :'')

	 const ViewPopup = (this.state.view ? <ViewCat onCatClose={this.ViewClose} value={this.props.catArray} setCat={this.props.setCat} deleteCat={this.props.catDelete}/> :'')
	 return(

      <div className="rght_cate">
            
        <div className="rght_cate_hd"  id="rght_cat_bg">Options</div><div className="clos_btnCrudTray"><img src="./images/clos.png"   alt="" id="clos_pop" onClick={this.props.onTrayClose}/></div>
        <div className="rght_list">
          <h4 style={{'visibility':'hidden'}}></h4>
       	  <div>{createPopup}</div>
       	  <div>{ViewPopup}</div>
            <ul style={{width:'300px',paddingTop:'-20px'}}>
              <li><a href="#" onClick={this.CreateOpen} class="btn btn-warning ">Create</a></li>
              <li><a href="#" onClick={this.ViewOpen} class="btn btn-warning ">Delete</a></li>
            </ul>
          </div>
      </div>
		);
  }

}

CatCrudTray.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CatCrudTray