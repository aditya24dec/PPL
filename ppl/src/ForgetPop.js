import React from 'react';
import $ from 'jquery';

class ForgetPop extends React.Component{

		componentWillMount(){

		console.log("Forget component did mount");
		<script type="text/javascript">
				$(document).ready(function() {
				  $('#rght_cat_bg').click(function() {
				      $('.rght_list').toggle("slide");
				  })
				});

				$(document).ready(function() {
				  $('#opn_cat_bg').click(function() {
				      $('.sub_dwn').toggle("slide");
				  })
				});



				$(document).ready(function() {
				  $('#clos_pop').click(function() {
				      $('#pop_forgt').toggle("slide");
				  })
				})
		</script>

	}
	render(){


		return(

				<div>
					<div className="popup_sec" id="pop_forgt">
				        <div className="clos_btn"><img src="images/clos.png" alt id="clos_pop" /></div>
				        <div className="pop_hdr">A mail has been send to your e-mail Id for Reset Password Link</div>
				        <div className="man_contnt">
				          <span>Please Check Your Mail Box!</span>
				          <input type="submit" defaultValue="Ok" />
				        </div>
				    </div>
				</div>


			);
	}


}

export default ForgetPop;