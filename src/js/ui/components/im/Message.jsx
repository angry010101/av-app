import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'css/components/im/message_preview.css'
import { formatDate } from 'js/backend/formatDate.jsx'
import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import * as DialogActions from 'js/backend/im/DialogActions.jsx'

import MessagesStore from 'js/backend/im/MessagesStore.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'

const styleUnread={
  backgroundColor: "#bcd0ff"
};


const styleUnreadInter={
  backgroundColor: "#bcd0ff"
};

const styleOnline={
  backgroundColor: "green"
};


const styleSelected={
  backgroundColor: "yellow"
};



const style1={
};

class Message extends Component {
  constructor(props) {
    super(props);
    var msg = props.contents;
    this.type = 0;
	
    this.state = {date: msg.date,
                  mid: msg.mid,
                  body: msg.body,
                  style: {
                    backgroundColor: ""
                  },
                  uid: msg.uid,
                  from_id: msg.from_id,
                  read_state: 0,
                  out: msg.out,
                  selected: false,
                  user: (msg.user) ? msg.user : { "err": 1 },
                  chat_id: msg.chat_id,
                  chat_active: msg.chat_active,
                  users_count: msg.users_count,
                  admin_id: msg.admin_id,
                  photo_50: msg.photo_50,
                  title: msg.title,
                  attachments: msg.attachments,
                  fwd_messages: msg.fwd_messages,
				  typing: 0,
                  selectedInMenu: false
                };    
  }

  componentDidMount(){
   /* alert("COMPONENT MOUNTED")
    if (typeof this.state.user == "undefined"){
       MessagesStore.on("ADDED_GROUP",(gid) =>{
        if(gid != Math.abs(this.state.uid)) return;
        var e = MessagesStore.getGroup(gid);
          let u = [];
        u.uid = this.state.uid;
        u.gid = e.gid;
        u.photo_50 = e.photo;
        u.first_name = e.name;
        u.last_name = "";
       this.setState({
         user: u
       });

      });
    }*/
	
  if (typeof this.state.user == "undefined" || this.state.user.err ){
		if (parseInt(this.state.uid) < 0){
			this.setState({
				user: UsersStore.getById(1000000000 + (parseInt(this.state.uid)*(-1)))
			})
			window.test_user = this.state.user;
			window.test_id = 1000000000 + (parseInt(this.state.uid)*(-1));
		}
		/*
		UsersStore.on("ADDED_USER",(u) => {
		if ((this.state.chat_id == u.uid && this.state.chat_id > 0) || (this.state.uid == u.uid && this.state.chat_id < 1) || (this.state.gid == u.uid && this.state.chat_id < 1)){
				this.setState({
					user: u
				})
			}
		})
		UsersStore.addUserImmediately(this.state.uid);*/
	}
	
	MessagesStore.on("user_typing",(uid,cid) => {
		if ((this.state.chat_id == cid && cid)|| (this.state.uid == uid && typeof cid == "undefined")){
			this.setTyping(1);
			setTimeout(()=> { this.setTyping(0); },5000)
		}
	})
  }
  
  setTyping(b){
	  		this.setState({
					typing: b
				})
  }

 handleClick(event) {
    event.preventDefault();
    if (this.state.out != 1) {
      this.setState({
        read_state: 1
      });
    }
  }

  handleSelect(e) {
    e.preventDefault();
    e.stopPropagation();
    DialogActions.deleteDialog(this.state.uid,this.type);
  }

  render() {
    let styleContainer = (this.props.contents.read_state == 0 && this.state.out == 1) ? "prev_msg_content  unread" : "prev_msg_content";
    //styleContainer = (this.state.selectedInMenu) ? "prev_msg_content selected_in_menu": "prev_msg_content"
    return (
      <div >
      <a className="hover_a" onClick={(e) => this.handleClick(e)} > 
      <div style={(this.state.selectedInMenu) ? styleSelected : style1 } className={(this.props.contents.read_state == 0 && this.state.out == 0  && !this.state.read_state) ?  "prev_msg_container unread" : "prev_msg_container"} ref="myInput" key="{this.state.mid}">

        <div className="prev_msg_headers">
          <div className="prev_name_text">
               { (typeof this.state.chat_id != 'undefined') ? this.state.title : 
               (typeof this.state.user != 'undefined') ?
                (typeof this.state.user.first_name != 'undefined')
                 ? this.state.user.first_name + " " + this.state.user.last_name : '' : '' } 
				 
				 {
					 (this.state.user.gid) ? this.state.user.name : " "
				 }
          </div>
          <div  className="prev_date_text">
            { formatDate(this.state.date) }

            <a className="select_dialog_btn" onClick={(e) => this.handleSelect(e)}> X</a>
          </div>
        </div>
        <div className="prev_img_div">
          <img className={(typeof this.state.user != 'undefined') ? (this.state.user.online != 1) ? "photo_img" : "img_online photo_img" : ""} 
          src={
			  
            (typeof this.state.user != 'undefined') ? (
		      (typeof this.state.user.gid == 'undefined') ? this.state.user.photo_50 : this.state.user.photo ): " " 
          }
          />
        </div>
      	<div className={ styleContainer } >
      		<div className={"prev_msg_text"}>
            { (this.state.out == 1) ? 
              "You: " : (typeof this.state.chat_id != 'undefined' && !this.state.typing) 
              ? this.state.user.first_name + " " + this.state.user.last_name + ": " : "" } 
              
              { (typeof this.state.attachments != "undefined") 
                ? <span>Attachments</span> : "" }

              { (typeof this.state.fwd_messages != "undefined") 
                ? <span>Fwd messages</span> : "" }
                
               { (!this.state.typing) ? this.state.body.replace('<br>', '\n') : "typing..." }
              
          </div>
      	</div>
      </div>
      </a>
      </div>
    );
  }
}




export default Message;


//TODO: html template