import React from 'react';
import ReactDOM from 'react-dom';
import AllPost from './AllPost.js';
import InfiniteScroll from './app';

const style = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 40
};

const divs = [ 

<div className="contnt_2">
          <div className="div_a">
            <div className="div_title">User Interface PSD Source files Web Designing for web</div>
            <div className="btm_rgt">
              <div className="btm_arc">Cats</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft"><img src="images/img_6.png" />Steave Waugh</div>
              <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
            </div>
            <div className="div_image"><img src="images/lft_img.png" alt="pet" /></div>
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</a></li>
                  <div className="like_count" style={{marginRight: 10}}><span className="lft_cnt" /><span className="mid_cnt">10</span><span className="rit_cnt" /></div>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Unlike</a></li>
                  <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">4</span><span className="rit_cnt" /></div>
                </ul>
              </div>
            </div>
          </div>
        </div>,
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">User Interface PSD Source files Web Designing for web</div>
            <div className="btm_rgt">
              <div className="btm_arc">Dogs</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft"><img src="images/img_6.png" />Steave Waugh</div>
              <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
            </div>
            <div className="div_image"><img src="images/lft_img1.png" alt="pet" /></div>
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</a></li>
                  <div className="like_count" style={{marginRight: 10}}><span className="lft_cnt" /><span className="mid_cnt">10</span><span className="rit_cnt" /></div>
                  <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Unlike</a></li>
                  <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">4</span><span className="rit_cnt" /></div>
                </ul>
              </div>
            </div>
          </div>
        </div>
 
];

const noHeightMessage = 'No height given to InfiniteScroll, free scroll like Facebook. Also try Pull Down to refresh! :P';
const colors = ['#9bc95b', '#ffd47b', '#95a9d6', '#ffa8e1'];

export default class NoHeight extends React.Component {
  constructor () {
    super();
    this.state = {
      divs: divs,
      post:[]
    };
    this.generateDivs = this.generateDivs.bind(this);
    this.refresh = this.refresh.bind(this);
  }


  setIntialPost()
  {
    console.log("Fetching post");
    fetch("http://localhost:8085/post/getPost")
    .then((resp) => resp.json())
    .then((response) => {console.log("response of will mount",response);this.setState({post:response.results})})
    .catch((err) => console.log(err))
  }
  componentWillMount()
  {
    this.setIntialPost()
  }

  generateDivs () {
    let moreDivs = [];
    let count = this.state.divs.length;
    this.state.post.map((x)=>{
        moreDivs.push(
      <li><AllPost id={x["_id"]} postTitle={x["title"]} postDate={x["date"]} postTime={x["time"]} postCat={x["category"]} postImage={x["imagefile"]} postUser={x["username"]} comments={x["comments"]} likes={x["likes"]} unlikes={x["unlikes"]} updateLikes={this.updateLikes} updateUnLikes={this.updateUnLikes}/></li>

      );
    }) 
    setTimeout(() => {
      this.setState({divs: this.state.divs.concat(moreDivs)});
    }, 500);
  }

  refresh () {
    this.setState({divs: []});
    setTimeout(() => {
      this.setState({divs});
    }, 3000);
  }

  render () {
    return (
      <div>
        <h3>{noHeightMessage}</h3>
        <InfiniteScroll
          pullDownToRefresh
          pullDownToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>}
          releaseToRefreshContent={<h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>}
          refreshFunction={this.refresh}
          next={this.generateDivs}
          hasMore={true}
          loader={<h1>Loading...</h1>}>
          {this.state.divs}
        </InfiniteScroll>
      </div>
    );
  }
}