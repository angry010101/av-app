import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'css/components/im/dialog_message.css'
import { formatDate } from 'js/backend/formatDate.jsx'
import DialogAttachments from 'js/ui/components/im/DialogAttachments.jsx' ;


import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import ForwardedMessage from 'js/ui/components/im/ForwardedMessage.jsx' ;

import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'




class ForwardedMessages extends Component {
  constructor(props) {
    super(props);
  }



  preparingUsers(e){
  
  if (typeof this.props.users.find(u => u.uid === e.uid) == "undefined"){
      UsersStore.addUserRequest(e.uid);
    }
    
  }

  prepareMessage(m){
    return <ForwardedMessage users={this.props.users} user={this.props.users.find(u => u.uid === m.uid)} msg={m} />
  }

  render() {
    
    this.props.info.map((e) => this.preparingUsers(e));

    UsersStore.loadUsersToAdd();
    
    return (
      <div >
        {
          this.props.info.map((e) => this.prepareMessage(e))
        }
      </div>
    );
  }
}

export default ForwardedMessages;


//TODO: html template