import React, { Component } from 'react';
import 'css/components/im/conversation_search_list.css'
import Message from 'js/ui/components/im/Message.jsx' ;

import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import SearchDialogStore from 'js/backend/im/SearchDialogStore.jsx'
import CreateChatStore from 'js/backend/im/CreateChatStore.jsx'


import SearchDialogItem from 'js/ui/components/im/SearchDialogItem.jsx'

import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import * as SearchDialog from 'js/backend/im/SearchDialog.jsx'

import * as SD from 'js/backend/im/SearchDialog.jsx'


import dispatcher from "js/backend/Dispatcher.jsx"

class RemoveChatUsersList extends Component {
  constructor(props){
    super(props);
    this.state=({
		users: [],
	  isRemovingUser: false
    });
  }

  componentWillMount(){
    
  }
  
  componentDidMount(){
	  
	MessagesStore.on("loaded_chat_users",(u) =>{
      this.setState({
    	  users: u
      });
    });
	
  }
  
  rm(id){
	let a = this.state.users;
	
	a =  a.filter(item => item.uid !== id)
	return a;
  }
  
  callbackRemoved(){
	this.setState({
		isRemovingUser: false
	});
  }
	
  hc(e,i){
    e.preventDefault();
	
	
	//remove 
	this.setState({
		isRemovingUser: true
	});
	
	MessagesStore.chatAction("remove_user",i.uid,this.callbackRemoved);
	this.setState({
		users: this.rm(i.uid)
	});
	//request
	//response
	
	
  }


  getListRes(){


	let res = this.state.users;
    //fix if only chatt
    var listItems;
   
        listItems = res.map((i1) =>
        <a onClick={(e) => this.hc(e,i1)} 
        key={parseInt(i1.uid)}>
			<SearchDialogItem i={i1} /></a> 
      );
	

      
	window.test_items1 = listItems;
    return (
        <ul className="cs_ul_list">
            { listItems }
			
        </ul>
    );
  }

  render() {
    return (
       <div className="conversation_search_main_div">
       
       	<div className="cs_list">
          { this.getListRes() }           
       	</div> 
      
       </div>
    );
  }
}

export default RemoveChatUsersList
