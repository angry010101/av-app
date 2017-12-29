import React, { Component } from 'react';
import 'css/components/im/send_message_panel.css'
import request from "superagent";
import SendMessageAttachmentsPanel from 'js/ui/components/im/SendMessageAttachmentsPanel.jsx' ;
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import 'css/components/im/send_message_attachments_panel.css'
import CreateChatStore from 'js/backend/im/CreateChatStore.jsx'

import * as SendMessage from 'js/backend/im/SendMessage.jsx'

window.photo_id = "";

class SendMessagePanel extends Component {
	constructor(props){
		super(props);
		this.state = {
			height: 96,
			messageText: "",
			message: {}
		};
	}

  handleSubmit(e){
  	e.preventDefault();
	var cC = MessagesStore.getSelectedConversation();
	let d = new Date().getTime();
	let me = MessagesStore.getMe();

	this.message={
			mid: -1,
			date: d,
			out: 1,
			uid: me.uid,
			read_state:	0,
			title: "",
			body: this.state.messageText,
			successSending: 0
		};

    window.smsg = this.message;
	var mid = -1;
    //MessagesStore.addDlgMessage(this.message);
    //alert(" casd" + cC.chat_id);
	
	SendMessage.send(this.state.messageText,cC.uid,cC.chat_id);

    this.setState({
		messageText: ""
	});
	window.photo_id = "";
	MessagesStore.resetSelectedMessages();
  }

  cancelFwdMessages(e){
  	e.preventDefault();
	MessagesStore.resetSelectedMessages();  	
  }

	autoGrow(element) {
	this.setState({
		messageText: element.target.value
	});
	/*var e = document.getElementById("message_textarea");
    	e.style.height = "auto";
    	var t = (e.scrollHeight);
   		if (t<=48){
   			e.style.height = 40 + "px";
   		}
   	var d = document.getElementById("dialog_container_div");
   	e.style.maxHeight = "216px";


   	var attachments_div = document.getElementById("dlg_user_action");
   	var h = 18;
   	var h1= 0;

   	if (parseInt(e.style.maxHeight) > parseInt(e.style.height)){
   		d.style.height = "calc(100% - " + (parseInt(e.style.height)+h+h1) + "px)"; 
   	}*/
}

	keyDown(e){
		if (e.keyCode === 13 && e.ctrlKey) {
    		this.clickSendBtn(e);
    	}
	}

	handleChangeAttachments(e){
		var files = e.target.files;
		for (var i=0;i<files.length;i++ )
		request.post('/file_upload')
		  	.attach('upload_file', e.target.files[i])
		  	.field('caption', 'My cats')	
            .end((err, res)=>{
              if (err || !res.ok) {
                 alert('Oh no! error img');
                 window.err = err;
              } else {
                 var j;
                 try{
                    j = JSON.parse(res.text);
                 }
                 catch(e){
                 	alert("err");
                 	return;
                 }
                 if (window.photo_id != "" && typeof window.photo_id != "undefined" && window.photo_id) 
                 			window.photo_id += ", ";
                 if (typeof j[0].id == "undefined"){
                 	
                 	 window.photo_id = "doc" + j[0].owner_id + "_" + j[0].did ; 
                 }
                 else {
                	 window.photo_id += j[0].id ;
                 }
                 alert("Uploaded");
              }
            });
	}


	clickSendBtn(e){
		e.preventDefault();
		if (!this.props.isCreatingChat){
			this.handleSubmit(e);
		}
		else {
			CreateChatStore.createChat(this.state.messageText);
		}
	}


	paste(e){
		
  
	}
  render() {
    return (
    	<div className="send_msg_block" id="sendMsgBlock" ref="smb">
			<form className="form_send_msg" onsubmit="this.onSubmit;">
				<div className="send_textarea_and_btn">
				<div className="btn_attachments">
					<input onChange={(e) => this.handleChangeAttachments(e)} type="file" className="file_btn"/> 
				</div>		
					<textarea onKeyDown={(e) => this.keyDown(e)} 
						 value={this.state.messageText}  
						 onChange={(e) => this.autoGrow(e)} 
						 className="textarea_message" 
						 type="text" 
						 id="message_textarea" 
						 name="msg" 
						 onPaste={(e) => this.paste(e)}
						 placeholder={(!this.props.isCreatingChat) ? "Your message..." : "Type chat title"}>
					</textarea>
						<div className="send_btn">
							<input onClick={(e) => this.clickSendBtn(e)} 
								type="submit" 
								name="sbm" 
								value="" 
								className="send_btn_input" />
							{//<img src="https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/Appliaction%20and%20Programs/iPhoto.png" className="img_photo_attachment"/>
							}
						</div>
				</div>
				{
				(this.props.selectedMessages || this.props.attachments.length > 0) ?	
				
				<div style={{display: "block"}}  className="dlg_user_actions_wrapper" id="dlg_user_action">
					<div className="dlg_user_actions">
					  <ul className="attachment_ul">	
						{(this.props.selectedMessages > 0) ?
						<li className="attachment_li">
							<span className="fwd_messages_label">
								Forwarded messages {this.props.selectedMessages } 
								<a onClick={(e) => this.cancelFwdMessages(e)}> X</a>
						 	</span>
						</li>
						: "" }
						{(this.props.attachments.length > 0) ?
						<li className="attachment_li">
							<span className="fwd_messages_label">
								Attachments {this.props.attachments.length } 
						 	</span>
						</li>
						: "" }
					  </ul>
					</div>	
				</div> : " "
				}
				<input type="hidden" id="rec_id" name="recipient_id" />
				<input type="hidden" id="isChat" />
			</form>
		</div>
    );
  }
}

export default SendMessagePanel;

/*
<ViewDialogContainer />
    	<SendMessagePanel />
*/