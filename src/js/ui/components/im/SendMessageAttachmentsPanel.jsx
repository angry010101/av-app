import React, { Component } from 'react';
import 'css/components/im/send_message_attachments_panel.css'
const request = require('superagent');

class SendMessageAttachmentsPanel extends Component {
/*
//DOESN"T WORK
	handleChange = (e) => {
		  request.post('/file_upload')
		  	.attach('upload_file', e.target.files[0])
		  	.field('caption', 'My cats')
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error img');
                 window.err = err;
              } else {
                 window.res = res;
                 var j;
                 try{
                    j = JSON.parse(res.text);
                 }
                 catch(e){

                 }
                 if (typeof j[0].id == "undefined"){
                 	 window.photo_id = "doc" + j[0].owner_id + "_" + j[0].did; 
                 }
                 else {
                	 window.photo_id = j[0].id ;
                 }
              }
            });
	
}*/

  render() {
    return (
		<div className="dlg_additional_actions_div_wrapper">
			<div className="dlg_additional_actions_div">
				<ul>
					<li>
						<a className="attachment_btn">
							<input onChange={(e) => this.handleChange(e)} type="file" className="file_btn"/> 
							<img src="https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/Appliaction%20and%20Programs/iPhoto.png" className="img_photo_attachment"/>
						</a>
					</li>
				</ul>
			</div>
		</div>
    );
  }
}

export default SendMessageAttachmentsPanel;