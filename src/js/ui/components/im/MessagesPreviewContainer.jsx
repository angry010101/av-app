import React, { Component } from 'react';
import Message from 'js/ui/components/im/Message.jsx' ;
import 'css/components/im/messages_preview_container.css'
import MessagesContainer from 'js/ui/components/im/MessagesContainer.jsx'
import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import { startLoadingPreviewMessages } from 'js/backend/im/LoadPreviewMessages.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'


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
  
  updateMessages(){
	  this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
  }

  updateMessage(){
	  this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
  }
  
  componentDidMount(){
	MessagesStore.on("addedPrevMessage", ()=>{
		this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
	});
    MessagesStore.on("addedPrevMessages",() => {
		this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
	  window.test_msgs =this.state.msgs;
	});
	
    UsersStore.on("USERS_CHANGED",(type,p1,p2,p3) => {
		this.setState({
          msgs: MessagesStore.getPrevMessages(),
          msgscount: MessagesStore.getPrevMessagesCount()
      });
	});
  }
  
  componentWillUnmount(){ 
	/*MessagesStore.removeListener("addedPrevMessage", this.updateMessage);
    MessagesStore.removeListener("addedPrevMessages",this.updateMessages);*/
  }


  selectDialog(e,m){
      e.preventDefault();
      var c=-1;
	  
	
      if (typeof m.chat_id != 'undefined'){
        c = m.chat_id;
      }
      MsgActions.selectDialog(m.uid,c,m.mid);
      MsgActions.showBackBtn();
  }

 ListItem(m,k1) {
  //if (parseInt(m.uid)<0) return "";
  
  return <div>
        <li onClick={(e) => this.selectDialog(e,m)} key={k1}>
            <Message contents={ m }/> 
         </li>
      </div>;
  }


  MessagesContainerFun() {
    const msgs = this.state.msgs;
	const count = this.state.msgscount;
    const listItems = msgs.map((message) => 
      this.ListItem(message,(message.chat_id) ? message.chat_id + 10000000000 :  message.mid)
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