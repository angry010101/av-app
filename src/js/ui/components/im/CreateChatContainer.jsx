import React, { Component } from 'react';
import ConversationSearchList from 'js/ui/components/im/ConversationSearchList.jsx'
import dispatcher from "js/backend/Dispatcher.jsx"

import CreateChatStore from 'js/backend/im/CreateChatStore.jsx'

import 'css/components/im/conversation_search.css'


import 'css/components/im/create_chat_container.css'

import ChatUserItem from 'js/ui/components/im/ChatUserItem.jsx'
import ConversationSearch from 'js/ui/components/im/ConversationSearch.jsx'
import SearchDialogStore from 'js/backend/im/SearchDialogStore.jsx'


const listyle={
  "list-style": "none",
  "padding" : 0,
  "margin" : 0
};

function 
  ListItem(props) {
  const value = props.value;
  return (
    <li >
      <ChatUserItem id={value}/>
    </li>
  );
}

class CreateChatContainer extends Component {
  constructor(props){ 
      super(props);
      this.state={
        q: "",
        chat_users: CreateChatStore.getUsers()
      };      
  }


  componentWillMount(){
    CreateChatStore.on("CHANGED_CHAT_USERS",() =>{
        this.setState({
           chat_users: CreateChatStore.getUsers()
        });
    });

    SearchDialogStore.on("SEARCH_DIALOG_STARTED",(q) => {
        this.setState({
          q: q
        });
    });
  }


  getUsers(){

  }



  getList(){
  const numbers = this.state.chat_users;
  if (numbers.length <= 0){
    return <div className="label_no_users_div">no one there</div>
  }


  const listItems = numbers.map((number) =>
        <ListItem  key={number} value={number} />
      );
  return (
    <ul style={listyle}>
      {listItems}
    </ul>
  );
  }

  render() {
    return (
    	<div className="">
        <ConversationSearch isChatContainer={1}/>
         {(this.state.q != "") ?
            <ConversationSearchList isCreatingChat={true} isChatContainer={1}/> : ""}
        <div className="label_chat_users_div">FUTURE CHAT USERS</div>
        { 
          this.getList()
         }
      </div>
    );
  }
}


export default CreateChatContainer;