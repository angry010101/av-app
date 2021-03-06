import React, { Component } from 'react';
import 'css/components/im/send_message_panel.css'
import request from "superagent";
import SendMessageAttachmentsPanel from 'js/ui/components/im/SendMessageAttachmentsPanel.jsx' ;
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import 'css/components/im/send_message_attachments_panel.css'
import CreateChatStore from 'js/backend/im/CreateChatStore.jsx'

import * as SendMessage from 'js/backend/im/SendMessage.jsx'

window.photo_id = "";

var DataTransfer = require('fbjs/lib/DataTransfer');


const progressLink = "/static/images/circle-loading.gif";


import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   your_message:"Your message...",
   chat_title: "Enter chat title here...",
   error: "Oh no! An error happened.",
   uploaded: "File is successfully uploaded",
   file_upload_attention: "Only one attached file is possible. Are you sure you want to overrite attached file?"
 },
 ua: {
   your_message:"Ваше повідомлення...",
   chat_title: "Будь ласка, введіть назву бесіди...",
   error: "О ні! Трапилася помилка",
   uploaded: "Файл завантажений",
   file_upload_attention: "Дозволено відправляти лише один файл за повідомлення. Ви певні, що хочете відправити інший файл?"
 },
 ru: {
   your_message:"Ваше сообщение...",
   chat_title: "Введите название чата...",
   error: "О нет! Случилась ошибка",
   uploaded: "Файл успешно загружен",
   file_upload_attention: "Разрешено отправлять только один файл за одно сообщение. Вы уверены что хотите перезаписать прикрепленный файл?"
 }
});

const divSpace = {
  width: '32px',
  height: '32px',
  display: 'inline-block'
};

const progressStyle = {
	"width": "32px",
	"height": "32px",
	"margin-left": "8px"
}

class SendMessagePanel extends Component {
	constructor(props){
		super(props);
		this.state = {
			height: 96,
			messageText: "",
			message: {},
			
			isUploading: false,
			attachments: [],
			type: "",
			msgAttachments: MessagesStore.getMessageAttachments()
		};
	}

	
	
	componentWillMount(){
		MessagesStore.on("MESSAGE_ATTACHMENT_ADDED",() => {
			this.setState({
				msgAttachments: MessagesStore.getMessageAttachments()
			})
		})
	}
	
  handleSubmit(e){
  	e.preventDefault();
	var cC = MessagesStore.getSelectedConversation();
	let d = new Date().getTime();
	let me = MessagesStore.getMe();
	let msgAttachments = MessagesStore.getMessageAttachmentsFormatted();


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
	
	
	SendMessage.send(this.state.messageText,cC.uid,cC.chat_id,msgAttachments);

    this.setState({
		messageText: ""
	});
	window.photo_id = "";
	MessagesStore.resetSelectedMessages();
	MessagesStore.resetMessageAttachments()
  }

  cancelFwdMessages(e){
  	e.preventDefault();
	MessagesStore.resetSelectedMessages();  	
  }
  
  cancelAttachment(e,i){
  	e.preventDefault();
	 MessagesStore.removeMessageAttachment(i)
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
	
	addAttachment(s){
		let tarr = this.state.attachments;
		tarr.push(s)
		this.setState({
			 attachments: tarr
		});
		
		window.test_attachment = this.state.attachments
	}

	handleChangeAttachments(e,a){
		var files
		if (a == "paste") {
			files = e;
		}
		else {
			e.preventDefault();
			files = e.target.files;
		}
		this.setState({
			isUploading: true
			},() => {
		for (var i=0;i<files.length;i++ )
		request.post('/file_upload')
		  	.attach('upload_file', 	files[i])
		  	.field('caption', 'My cats')	
            .end((err, res)=>{
              if (err || !res.ok) {
                 alert(strings.error);
              } else {
                 var j;
                 try{
                    j = JSON.parse(res.text);
                 }
                 catch(e){
                 	alert(strings.error);
                 	return;
                 }
				 MessagesStore.parseMessageAttachment(j)
			
                 alert(strings.uploaded);
              }
			  
				this.setState({
					isUploading: false
				});
            }); 
			
			} );
	}


	clickSendBtn(e){
		e.preventDefault();
		if (!this.props.isCreatingChat){
			this.handleSubmit(e);
		}
		else {
			MessagesStore.resetMessageAttachments()
			CreateChatStore.createChat(this.state.messageText);
		}
	}


	paste(e){
		var data = new DataTransfer(e.clipboardData);
		var text = data.getText();
		var html = data.getHTML();
		var files = data.getFiles();
		
		window.test_files = files;
		if (typeof files != "undefined" && files.length > 0){
			this.handleChangeAttachments(files,"paste");	
		}
	}
	
	showProgress(){
		return  <img src={progressLink} style={progressStyle} />	 
	}
	
	
	formatMsgAttachments(){
		const elements = this.state.msgAttachments 
		const listeleelements = elements.map((e,i) => {
			return <li className="attachment_li">
							<span className="fwd_messages_label">
								 { (e.title) ? e.title : "attachment" + i}
								<a onClick={(e1) => this.cancelAttachment(e1,i)}> X</a>
						 	</span>
						</li>
		})
		
		return listeleelements
	}
	
  render() {
    return (
    	<div className="send_msg_block" id="sendMsgBlock" ref="smb">
			<form className="form_send_msg" onsubmit="this.onSubmit;">
				<div className="send_textarea_and_btn">
				{ 
				(!this.props.isCreatingChat) ? 
				<div className="btn_attachments">
					<input onChange={(e) => this.handleChangeAttachments(e)} type="file" className="file_btn"/> 
				</div>	: <div style={divSpace}></div>
				}
					<textarea onKeyDown={(e) => this.keyDown(e)} 
						 value={this.state.messageText}  
						 onChange={(e) => this.autoGrow(e)} 
						 className="textarea_message" 
						 type="text" 
						 id="message_textarea" 
						 name="msg" 
						 onPaste={(e) => this.paste(e)}
						 placeholder={(!this.props.isCreatingChat) ? strings.your_message : strings.chat_title}>
					</textarea>
					{ (!this.state.isUploading) ?
						<div className="send_btn">
							<input onClick={(e) => this.clickSendBtn(e)} 
								type="submit" 
								name="sbm" 
								value="" 
								className="send_btn_input" />
							{//<img src="https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/Appliaction%20and%20Programs/iPhoto.png" className="img_photo_attachment"/>
							}
						</div> : this.showProgress()
					}
				</div>
				{
				(this.props.selectedMessages || this.state.msgAttachments.length >0) ?	
				
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
						{ this.formatMsgAttachments() }
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