import React, { Component } from 'react';
import 'css/components/im/dialog_container.css'
import DialogMessage from 'js/ui/components/im/DialogMessage.jsx' ;
//import * as MsgActions from '/home/angry/av-app/src.jsx/backend/im/MsgActions.jsx';
import SearchMessagesStore from 'js/backend/im/SearchMessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'
import { startLoadingDialogMessages } from 'js/backend/im/LoadDialogMessages.jsx'

import 'css/components/im/dialog_container.css'
import DialogAttachments from 'js/ui/components/im/DialogAttachments.jsx' ;
import * as SM from 'js/backend/im/SearchMessages.jsx'

import dispatcher from "js/backend/Dispatcher.jsx"

const emptyMessagesDiv = (<div className="empty_messages_div"><a>it is empty and cold</a></div>);

window.dlgsOffset = 0;

import 'css/components/im/create_chat_container.css'

const style_load_documents_link = {
	"margin-left": "8px",
	"font-family": "Arial"
}
const scroll_container = {
	"height": "calc(100% - 40px)",
	"overflow-y": "auto"
}

const height_style = {
	"height": "100%",
	
}

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   load_more: "Load more...",
   empty_container: "it is empty and cold"
 },
 ua: {
   load_more: "Завантажити ще...",
   empty_container: "тут порожньо та холодно"
 },
 ru: {
   load_more: "Загрущить ещё...",
   empty_container: "тут пусто и холодно"
 }
});


function ListItem(props) {
  
  return (<div>
      <li>
        <DialogMessage isSearch={true} key={props.value.mid} contents={props.value} user={props.user} users={props.users}/> 
      </li>
      </div>);
}

class SearchDialogMessages extends Component {
    constructor(props) {
      super(props);
      this.state=({
        q: "",
		res: ""
      })
    }
    
    componentWillMount(){
    
    }

	componentDidMount(){
	  SearchMessagesStore.on("SEARCH_MESSAGES_RESPONSE_PARSED",() => {
			this.setState({
				res: SearchMessagesStore.getResponse(),
				count: SearchMessagesStore.getCount()
			});
	  });
	  
	  SearchMessagesStore.on("SEARCH_MESSAGES_STARTED",() => {
			this.setState({
				res: [],
				count: 0
			});
	  });
	}
	
	
  preparingUsers(e){
  
  if (typeof UsersStore.getById(e.uid) == "undefined"){
      UsersStore.addUserRequest(e.uid);
    }
    
  }

	
	
    getList() {
	  const count = 0;//??? 
      const msgs = this.state.res;
      var users =  UsersStore.get();
      const me = UsersStore.getMe();
	  
	  
	   for (var i=0;i<msgs.length; i++){
		   this.preparingUsers(msgs[i]);		   
	   }

	   UsersStore.loadUsersToAdd();
	
      if (msgs.length === 0) return this.emptyDiv();
      const listItems = msgs.map((message) =>
         <ListItem value={message} user={(message.out === 1) ? me[0] : users.find(u => u.uid === message.uid)} users={users}/>
      );
	  

      //MessagesStore.loadUsers();
      return (
	  <div style={scroll_container}>
        <div id="msg_container">
          <ul className="list_messages_container">
            { listItems }
          </ul>
        </div>
	</div>
		);
	}
	  
	 emptyDiv(t){
		return (<div className="empty_messages_div"><a>There's no messages there</a></div>);
	 }
	 
	 
	 handleChange(e){
		this.setState({
		  q: e.target.value
		});
		e.preventDefault();
		SM.searchMessages(e.target.value);
	}
	
	 
	getRender(){
		var t = (
		<div style={height_style}><div className="im_conversation_search">
          	<input value={this.state.q} className="conversation_search_input" onChange={ (e) => this.handleChange(e) }/>
		</div>{this.getList()}</div>)
		
		return ( t  )
	}
	
 
    render() {
		return this.getRender();
    }
}

export default SearchDialogMessages;