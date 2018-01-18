import React from 'react';
import {Link} from 'react-router-dom';

class AllPost extends React.Component
{
	render(){

    console.log("props of post",this.props)

		return(
  				<div>
  	
            { this.props.postArray.map((x)=>

                  <div className="div_a">
                  <div className="div_title">{x["title"]}</div>
                  <div className="btm_rgt">
                  <div className="btm_arc">{x["category"]}</div>
                  </div>
                  <div className="div_top" >
                  <div className="div_top_lft"><img src="images/img_6.png" />{x["username"]}</div>
                  <div className="div_top_rgt"><span className="span_date">{x["date"]}</span><span className="span_time">{x["time"]}</span></div>
                  </div>
                  <div className="div_image" name={x["_id"]}><Link to={`./singlepost/${x["_id"]}`}><img src={`http://localhost:8085/${x["imagefile"]}`} alt={this.props.postImage}/></Link></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{x["comments"].length} Comments</a></li>
                        <li><a id={x["_id"]} onClick={this.props.updateLikes}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</a></li>
                        <div className="like_count" style={{marginRight: 10}}><span className="lft_cnt" /><span className="mid_cnt">{x["likes"].length}</span><span className="rit_cnt" /></div>
                        <li><a id={x["_id"]} onClick={this.props.updateUnLikes}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Unlike</a></li>
                        <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">{x["unlikes"].length}</span><span className="rit_cnt" /></div>
                      </ul>
                    </div>
                  </div>
                   </div>


              )}
         
  			   </div>

		    	);
	       }
}

export default AllPost