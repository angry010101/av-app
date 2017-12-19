import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'css/components/im/message_preview.css'
import { formatDate } from 'js/backend/formatDate.jsx'
import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import * as DialogActions from 'js/backend/im/DialogActions.jsx'

import MessagesStore from 'js/backend/im/MessagesStore.jsx'


const styleUnread={
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
                  read_state: msg.read_state,
                  out: msg.out,
                  selected: false,
                  user: msg.user,
                  chat_id: msg.chat_id,
                  chat_active: msg.chat_active,
                  users_count: msg.users_count,
                  admin_id: msg.admin_id,
                  photo_50: msg.photo_50,
                  title: msg.title,
                  attachments: msg.attachments,
                  fwd_messages: msg.fwd_messages,

                  selectedInMenu: false
                };    
  }

  componentWillMount(){
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
    let styleContainer = (this.state.read_state == 0 && this.state.out == 1) ? "prev_msg_content  unread" : "prev_msg_content";
    styleContainer = (this.state.selectedInMenu) ? "prev_msg_content selected_in_menu": "prev_msg_content"
    return (
      <div >
      <a className="hover_a" onClick={(e) => this.handleClick(e)} > 
      <div style={(this.state.selectedInMenu) ? styleSelected : style1 } className={(this.state.read_state == 0 && this.state.out == 0) ? "prev_msg_container  unread" : "prev_msg_container"} ref="myInput" key="{this.state.mid}">

        <div className="prev_msg_headers">
          <div className="prev_name_text">
               { (typeof this.state.chat_id != 'undefined') ? this.state.title : 
               (typeof this.state.user != 'undefined') ?
                (typeof this.state.user.first_name != 'undefined')
                 ? this.state.user.first_name + " " + this.state.user.last_name : '' : '' } 
          </div>
          <div  className="prev_date_text">
            { formatDate(this.state.date) }

            <a className="select_dialog_btn" onClick={(e) => this.handleSelect(e)}> X</a>
          </div>
        </div>
        <div className="prev_img_div">
          <img className={(typeof this.state.user != 'undefined') ? (this.state.user.online != 1) ? "photo_img" : "img_online photo_img" : ""} 
          src={
            (typeof this.state.user != 'undefined') ? 
              ( /*"https://vkuk.000webhostapp.com/getcontent.php?url=" 
              +*/ this.state.user.photo_50) : " " 
          }
          />
        </div>
      	<div className={ styleContainer } >
      		<div className="prev_msg_text">
            { (this.state.out == 1) ? 
              "You: " : (typeof this.state.chat_id != 'undefined') 
              ? this.state.user.first_name + " " + this.state.user.last_name + ": " : "" } 
              
              { (typeof this.state.attachments != "undefined") 
                ? <span>Attachments</span> : "" }

              { (typeof this.state.fwd_messages != "undefined") 
                ? <span>Fwd messages</span> : "" }
                
               { this.state.body.replace('<br>', '\n') }
              
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