import React, { Component } from 'react';
import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'

import 'css/components/im/chat_user_item.css'

import CreateChatStore from 'js/backend/im/CreateChatStore.jsx'

class ChatUserItem extends Component {

  constructor(props){
    super(props);
    this.id = this.props.id;
    this.user = UsersStore.getById(this.id);
  }
  handleChange(e){
  	e.preventDefault();
  }


  hc(e){
    e.preventDefault();
    CreateChatStore.selectUser(this.id);
  }
 

  componentWillMount(){
  }

  render() {
    let d = this.user;
    if (typeof d == "undefined") return ""; 
    d.title = d.first_name + " " + d.last_name;
    switch(d.type){
      case "profile":
        d.title = d.first_name + " "  + d.last_name;
        break;
    }


    return (
        <div>
          <a className="dlgsearch_item_div_h"> 
          <div className="dlgsearch_item_div">
            <img className="dlgsearch_img" src={d.photo_50} />
            <div className="chat_user_text">{ d.title }</div>
            <div className="chat_user_item_remove_div" onClick={(e) => this.hc(e)}>X</div>
          </div>
          </a>
        </div>
    );
  }
}

export default ChatUserItem;