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

class ConversationSearchList extends Component {
  constructor(props){
    super(props);
    this.state=({
      q: ""
      ,s: 0,
      isChatContainer: 0
      ,res: []
    });
    this.first = false;
  }



  selectDialog(e){
      e.preventDefault();
      MsgActions.selectDialog(1,1);
  }

  componentWillMount(){
    SearchDialogStore.on("SEARCH_DIALOG_RESPONSE_PARSED",(e,iscc,r) =>{
      this.setState({
          q: e,
          isChatContainer: iscc,
          res: r
      });
    });
    SearchDialogStore.on("SEARCH_DIALOG_STARTED",(e) =>{
      this.setState({
          q: e,
          res: []
      });
    });

  }

  hc(e,i){
    e.preventDefault();
	if (!this.props.addingChatUsers){
		if (!this.props.isCreatingChat){
		  switch(i.type){
			case "chat":
			  MsgActions.selectDialog(i.chat_id,1);//id, ischat
			  break;
			case "profile":
			  MsgActions.selectDialog(i.uid,0);//id, ischat
			  break;
			default:
			  break;    
		  }
		  MsgActions.showBackBtn();
		}
		else {
		  if (i.type != "profile") return;
		  CreateChatStore.selectUser(parseInt(i.uid));
		}
	}
	else {
		MessagesStore.addUserToChat(i.uid);
	}
  }


  getList(q){
	//async
	
  var res;
    if (this.props.isCreatingChat && !this.first){
      this.first = !this.first;
      SD.searchDialog("");
    }
    res = SearchDialogStore.getResponse();

 const listItems = res.map((i1) =>
        <a onClick={(e) => this.hc(e,i1)} key={parseInt(i1.uid) + (typeof i1.chat_id != "undefined") ? (200000000 + parseInt(i1.chat_id)) : 0}><SearchDialogItem i={i1} /></a>
	 );
  

    return (
        <ul className="cs_ul_list">
            { listItems }
        </ul>
    );
  }

  getListRes(res){
    if (this.props.q == "" && this.props.isChatContainer==1) {
      return ;
    }


    //fix if only chatt
    var listItems;
    if (this.props.isCreatingChat){
        listItems = res.map((i1) =>
        (i1.type == "profile") ? <a onClick={(e) => this.hc(e,i1)} 
        key={parseInt(i1.uid) +
         (typeof i1.chat_id != "undefined") ? 
         (200000000 + parseInt(i1.chat_id)) : 0}>
         <SearchDialogItem i={i1} /></a> : ""
       );
    }
    else {
        listItems = res.map((i1) =>
        <a onClick={(e) => this.hc(e,i1)} 
        key={parseInt(i1.uid) +
         (typeof i1.chat_id != "undefined") ? 
         (200000000 + parseInt(i1.chat_id)) : 0}>
         <SearchDialogItem i={i1} /></a> 
       );
    }

      
  

    return (
        <ul className="cs_ul_list">
            { listItems }
        </ul>
    );
  }

  render() {
    return (
       <div className="conversation_search_main_div">
       { (this.props.q != "") ?
          <div className="cs_header">
          <span className="cs_query">
          Search: { this.state.q }
          </span>  
        </div> : ""
      }
      {
       	<div className="cs_list">
          { this.getListRes(this.state.res) }           
       	</div> 
      }
       </div>
    );
  }
}

export default ConversationSearchList
