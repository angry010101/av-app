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
import moment from 'moment';
 

import DatePicker from 'react-datepicker';


import 'react-datepicker/dist/react-datepicker.css';

const emptyMessagesDiv = (<div className="empty_messages_div"><a>it is empty and cold</a></div>);

window.dlgsOffset = 0;

import 'css/components/im/create_chat_container.css'

const style_load_documents_link = {
	"margin-left": "8px",
	"font-family": "Arial"
}
const scroll_container = {
	
}

const height_style = {
	"height": "calc(100% - 73px)",
	"width": "100%"
	
}

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   load_more: "Load more...",
   empty_container: "it is empty and cold",
   search_date: "Search before date",
   peer: "Recipient"
 },
 ua: {
   load_more: "Завантажити ще...",
   empty_container: "тут порожньо та холодно",
   search_date: "Шукати до дати",
   peer: "Отримувач"
 },
 ru: {
   load_more: "Загрущить ещё...",
   empty_container: "тут пусто и холодно",
   search_date: "Искать до числа",
   peer: "Получатель"
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
		from_date: moment(),
		query_date: 0,
		res: "",
		peer: props.peer
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
		e.preventDefault();
		this.setState({
		  q: e.target.value
		},() => {			
			SM.searchMessages(this.state.q,this.state.query_date,this.state.peer);
		});
	}
	
	 handleDateChange(e){
		
		window.test_date_obj = e;
		let d = e._d.getDate()
		let m = e._d.getMonth()
		let y = e._d.getFullYear()
		let sd = ((d>=10) ? d : "0"+d)+ ((m>=10) ? m : "0"+m) + y   ;
		this.setState({
		  from_date: e,
		  query_date: sd
		},() => { if (this.state.q != "") SM.searchMessages(this.state.q,this.state.query_date,this.state.peer) });
	 }
	 
	getRender(){
		let user;
		let screen_title = ""
		if (this.state.peer){
			user = UsersStore.getById(this.state.peer);
			if (user){
				screen_title = user.first_name + " " + user.last_name;
			}
		}
		
		var t = (
		<div style={height_style}><div className="im_conversation_search">
          	<input value={this.state.q} className="conversation_search_input" onChange={ (e) => this.handleChange(e) }/>
			<div style={{"margin": "6px"}}>
			{ strings.search_date + ": "}
				<div style={{"display": "inline-block"}}>
					<DatePicker
						selected={this.state.from_date}
						onChange={(e) => this.handleDateChange(e)}
					/>
				</div>
				{
					(screen_title != "") ? <span style={{"margin-left": "8px","display": "inline-block","float": "right"}}>{ strings.peer + ": " +  screen_title }</span> : ""
				}
			</div>
		</div>{this.getList()}</div>)
		
		return ( t )
	}
	
 
    render() {
		return this.getRender();
    }
}

export default SearchDialogMessages;