import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'css/components/im/dialog_message.css'
import { formatDate } from 'js/backend/formatDate.jsx'
import DialogAttachments from 'js/ui/components/im/DialogAttachments.jsx' ;
import ForwardedMessages from 'js/ui/components/im/ForwardedMessages.jsx' ;
import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'


import dispatcher from "js/backend/Dispatcher.jsx"




import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   message_deleted: "Deleted"
 },
 ua: {
   message_deleted: "Видалено"
 },
 ru: {
   message_deleted: "Удалено"
 }
});


class DialogMessage extends Component {
  constructor(props) {
    super(props);
    
    var msg = props.contents;
    this.msg = msg;
    var u = props.user;
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
                  user: (typeof u !== 'undefined') ? u : [],
                  attachments: msg.attachments
                };
    if (window.constructorDialogMessageCalled){
      window.constructorDialogMessageCalled += 1;
    }   
    else {
      window.constructorDialogMessageCalled == 1;
    }
  }

  
  changeSt(e) {
    e.preventDefault();
    MsgActions.selectDialogMessage(this.state.mid);
    this.setState({selected: !this.state.selected});
  }


    componentWillMount(){
      UsersStore.on("ADDED_USER",(u) =>{
      if (u.uid == this.msg.uid)
      this.setState({
          user: u
      });
    });
      
      MessagesStore.on("selectedMessagesReset",() => {
        this.setState({selected: false});
      });
      
    

  }

  selection(e) {
   /*       var txt = "";

        if (window.getSelection) {
                txt = window.getSelection();
        }
        else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.seleciton.createRange().text;
        }

        //alert("Selected text is " + txt);
        this.changeSt(e);*/
    }

    deleteMsg(e){
      e.preventDefault();
      e.stopPropagation();
      MessagesStore.deleteMsg(this.state.mid,this.state.selected);
    }

  render() {
    var a1 = 1;
    return (
      <div onMouseOver={this.selection.bind(this)} className={ (this.state.selected === false) ? 'msg_wrapper' : 'msg_wrapper  selected' } style="" ref="myInput" key="{this.state.mid}" style={this.state.style} onClick={this.changeSt.bind(this)} >
        <div className="msg_container">
          <div className="msg_img_div">
            <img className="photo_img" src={
              /*("https://vkuk.000webhostapp.com/getcontent.php?url=") + */this.state.user.photo_50} />
          </div>
          <div className="msg_content_div">
              
              <div className="msg_headers">
                <div className="msg_name_text">
                  {this.state.user.first_name + " " + this.state.user.last_name}
                </div>
                <div className="msg_delete">
                  <a onClick={(e) => this.deleteMsg(e)}>X</a>
                </div>
                <div className="msg_date_text">
                  { formatDate(this.state.date) }
                </div>
              </div>
              
              <div className="msg_content">
                <div className="msg_text">
                  { 
                    (typeof this.state.body != "undefined" && this.state.body != "" ) ?
                    this.state.body.split("<br>").map(function(item) {
                     return (
                      <div>{item}<br/></div> 
                      )
                    }) : ""
                  }</div>

                  {
                    (typeof this.msg.attachments != "undefined") ?
                     (<DialogAttachments info={this.msg.attachments}/>)
                     : ""
                  }


                                    {
                  (typeof this.msg.fwd_messages != "undefined") ?
                     (<ForwardedMessages users={this.props.users} info={this.msg.fwd_messages}/>)
                     : ""
                  }

                  {
                    (this.msg.deleted == true) ? 
                      <a>{strings.message_deleted}</a> : ''
                    
                  }


              </div>
              
          </div>
        </div>	
      </div>
    );
  }
}

/*
 <div className="msg_state">
          </div>
          */

export default DialogMessage;


//TODO: html template