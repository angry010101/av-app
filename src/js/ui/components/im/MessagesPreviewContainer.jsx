import React, { Component } from 'react';
import Message from 'js/ui/components/im/Message.jsx' ;
import 'css/components/im/messages_preview_container.css'
import MessagesContainer from 'js/ui/components/im/MessagesContainer.jsx'
import request from "superagent";
import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'

import { startLoadingPreviewMessages } from 'js/backend/im/LoadPreviewMessages.jsx'



window.prevOffset = 0;


class MessagesPreviewContainer extends MessagesContainer {
  constructor(props){
    super(props);
    this.state=({
        msgs: MessagesStore.getPrevMessages(),
        msgscount: MessagesStore.getPrevMessagesCount()
    });
    //look at this attentively. maybethere is something wrong with it
    startLoadingPreviewMessages();
  }
  componentWillMount(){
    
  }

  componentDidMount() {
    const self = this;
	MessagesStore.on("addedPrevMessage",() =>{
      this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
    });
    MessagesStore.on("addedPrevMessages",() =>{
      this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
    });
   /* alert("one");
   
    $.getJSON("..jsxon/user.jsxon", .jsxon) => {
      this.setState({user:.jsxon});
    });
    alert("two");*/
    
  }

  selectDialog(e,m){
      e.preventDefault();
      var c=-1;
      if (typeof m.chat_id != 'undefined'){
        c = m.chat_id;
      }
      MsgActions.selectDialog(m.uid,c);//id, ischat
      MsgActions.showBackBtn();
  }

 ListItem(m,k1) {
  // Correct! There is no need to specify the key here:
  if (parseInt(m.uid)<0) return "";
  
  return <div>
        <li onClick={(e) => this.selectDialog(e,m)} key={k1}>
            <Message contents={ m }/> 
         </li>
      </div>;
  }


  MessagesContainerFun() { 
    const msgs = this.state.msgs;
    const count = this.state.msgscount;
    //var users = props.users;
    const listItems = msgs.map((message) => 
      this.ListItem(message,message.mid) 
    );
  
    return (
      <div >
        <ul className="list_messages_container">
            {listItems}
        </ul>
      </div>
    );
  }

  render() {
    return (
    	<div>
        { this.MessagesContainerFun() }
      </div>
    );
  }
}

export default MessagesPreviewContainer;