import React from 'react';

class CategoryList extends React.Component{

  constructor(props)
  {
    super(props)
  }

	render()
  {

		return(

			<div className="rght_cate">
        <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
        <div className="rght_list">
          <ul>
            <li><a name="all" onClick={this.props.setFilter}><span className="list_icon"><img src="images/btn_iconb.png" alt="up" /></span>All</a></li>
            { this.props.catArray.map((x,key)=>

              <li><a name={x["catName"]} onClick={this.props.setFilter}><span className="list_icon"><img src={`http://localhost:8085/${x["catImage"]}`} alt="up" /></span>{x["catName"]}</a></li>
            )}
          </ul>
          
        </div>
      </div>

		);

	}

}

export default CategoryList;