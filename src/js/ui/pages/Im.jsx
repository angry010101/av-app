import React, { Component } from 'react';
import MessagesPreviewContainer from 'js/ui/components/im/MessagesPreviewContainer.jsx'
import 'css/pages/im.css'
import DialogContainer from 'js/ui/components/im/DialogContainer.jsx'
import SendMessagePanel from 'js/ui/components/im/SendMessagePanel.jsx'
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import ConversationSearch from 'js/ui/components/im/ConversationSearch.jsx'
import ConversationSearchList from 'js/ui/components/im/ConversationSearchList.jsx'

import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import RemoveChatUsersList from 'js/ui/components/im/RemoveChatUsersList.jsx'

import SearchDialogMessages from 'js/ui/components/im/SearchDialogMessages.jsx'

import SearchDialogStore from 'js/backend/im/SearchDialogStore.jsx'
import { startLoadingDialogMessages } from 'js/backend/im/LoadDialogMessages.jsx'
import { startLoadingPreviewMessages } from 'js/backend/im/LoadPreviewMessages.jsx'
import CreateChatContainer from 'js/ui/components/im/CreateChatContainer.jsx'

const progressLink = "/static/images/circle-loading.gif";
const progressStyle = {
	"margin-top": "8%",
	"width": "48px",
	"height": "48px",
	"text-align": "center",
}
const progressDiv = {
	"text-align": "center",
	"width": "100%",
	"display": "block"
}


import dispatcher from "js/backend/Dispatcher.jsx"
class Im extends Component {
  constructor(props){ 
      super(props);
      this.state=({
        selectedConversation: MessagesStore.getSelectedConversation(),

        hideMenu: false,
        conversationSearchQuery: "",
        
        isSelectedMessages: 0,
        divstyle: {},
        isCreatingChat: false,
        divheight: 0,
		
		isAddingUserToChat: false,
		isRemovingUsersFromChat: false,
		
		currentChatUsers: [],
		showSendMessagePanel: false,
		showProgress: false,
		selected_first_dialog: false,
		isSearchingMessages: false,
		
		search_peer: ""
      });
      this.handleScrollPrev = this.handleScrollPrev.bind(this);
      this.handleScrollDlg = this.handleScrollDlg.bind(this);
      window.selectedMessages = [];
         
  }


  
  
  setSelectedMessages(c){
	  this.setState({
          isSelectedMessages: c
      });
  }
  
  resetSelectedMessages(){
	  this.setState({
          isSelectedMessages: 0
      });
  }
  
  setRemovingUsersFromChat(u){
	  this.setState({
          isRemovingUsersFromChat: true
      });
  }
  
  hideProgress(){
	  this.setState({
          showProgress: false
      });
  }
  
  
  	componentWillUnmount(){ 
	/*	MessagesStore.removeListener("hideMenu",);
		MessagesStore.removeListener("changeDialogHeight",this.setHeight);
		MessagesStore.removeListener("dlgMessageSelected",this.setSelectedMessages);
		MessagesStore.removeListener("selectedMessagesReset",this.resetSelectedMessages);
		MessagesStore.removeListener("loaded_chat_users",this.setRemovingUsersFromChat);
		MessagesStore.removeListener("addedDlgMessages",this.hideProgress);*/
	}

	
  componentDidMount(){
    MessagesStore.on("hideMenu",() => { this.setState({
          hideMenu: MessagesStore.getMenuStatus()
		})});
    MessagesStore.on("changeDialogHeight",() => { this.setHeight() } );
    MessagesStore.on("dlgMessageSelected",(c) => { this.setSelectedMessages(c) });
    MessagesStore.on("selectedMessagesReset", () => { this.resetSelectedMessages() });
    MessagesStore.on("loaded_chat_users",(e) => { this.setRemovingUsersFromChat(e) });
	MessagesStore.on("addedDlgMessages",() => { this.hideProgress() } );

	dispatcher.register( dispatch => {
        if ( dispatch.type === 'SHOW_PROGRESS' ) {
          this.setState({ showProgress: true })
        }
        if ( dispatch.type === 'HIDE_PROGRESS' ) {
          this.setState({ showProgress: false })
        }
        if ( dispatch.type === 'HIDE_BACK_BTN' ) {
          this.setState({ hideMenu: false })
		  if (this.state.isCreatingChat){
				//cancel creating chat
		  }
        }
        if ( dispatch.type === 'SHOW_BACK_BTN' ) {
          this.setState({ hideMenu: !this.state.hideMenu})
        }
        if (dispatch.type === 'SELECT_DIALOG'){
			this.setState({
				showSendMessagePanel: true,
				showProgress: true,
				selected_first_dialog: true
			});
          if (this.state.isSelectedMessages > 0)
            this.setState({
              selectedConversation: MessagesStore.getSelectedConversation()})
          else
            this.setState({ isSelectedMessages: 0,
              selectedConversation: MessagesStore.getSelectedConversation()})
        }
        if (dispatch.type === 'CREATE_CHAT'){
			if (!this.state.selected_first_dialog && !dispatch.chatState) {
				this.setState({
					showSendMessagePanel: false
				});				
			}
			else {
				this.setState({
					showSendMessagePanel: true
				});				
			}
          this.setState({
            isCreatingChat: dispatch.chatState
          });
        }
		if (dispatch.type === 'ADDING_CHAT_USER'){
          this.setState({
            isAddingUserToChat: dispatch.adding 
          });
        }
        if (dispatch.type === 'REMOVING_CHAT_USER'){
			if (dispatch.removing == false){
				this.setState({currentChatUsers: []});
			}
          this.setState({
            isRemovingUsersFromChat: dispatch.removing
          });
        }
        if (dispatch.type === 'SHOW_SEARCH_DIALOG_MESSAGES'){
          this.setState({
            isSearchingMessages: dispatch.startedSearching,
			search_peer: dispatch.pid
          });
        }
		
		
		
      });
	  
      
      SearchDialogStore.on("SEARCH_DIALOG_STARTED",(h) =>{
       this.setState({
          conversationSearchQuery: h
        });
    });
      SearchDialogStore.on("SEARCH_DIALOG_RESPONSE_PARSED",(h) =>{
       this.setState({
          conversationSearchQuery: h
        });
    });

  }

 
  handleScrollPrev(e){
      var myDiv = document.getElementById("prev_msg_container");
      if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight - 100) {
         if (!this.state.isCreatingChat && !this.state.isAddingUserToChat && !this.state.isRemovingUsersFromChat && this.state.conversationSearchQuery == "") startLoadingPreviewMessages();      
      }              
  }
  
  
	showProgress(){
		return (<div style={progressDiv} className={(!this.state.hideMenu) ? 'container right' : 'container right hide'} id="cRight"> 
				<img src={progressLink} style={progressStyle} /></div>);	 
	}
	 
  handleScrollDlg(e){ 
      var myDiv = document.getElementById("dialog_container_div");
      if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight - 100) {
          startLoadingDialogMessages();
      }              
  }

  render() {
	let divCreateChatStyle = {}; 
	if  (this.state.isCreatingChat && !this.state.isSearchingMessages ) { 
		/*divCreateChatStyle = {
			"display": "grid"
		} */
	} 
	
	let imPanelCreateChat = {};
	if  (this.state.isCreatingChat && !this.state.isSearchingMessages ) { 
		/*imPanelCreateChat = {
			"height": "62px",
			"position": "absolute",
			"bottom": "0",
			"width": "100%"
		}*/
	}

    return (
    	<div className="main_im_div" >
      		<div className="content">
			{ (!this.state.isSearchingMessages) ?
            <div className="container left">
				{
				(!this.state.isRemovingUsersFromChat) ? 
					<ConversationSearch /> : ""
				}
				<div className="container_previev_messages"  id="prev_msg_container"  onScroll={this.handleScrollPrev}>
					{
				    (this.state.isCreatingChat || this.state.isAddingUserToChat) ?
						<ConversationSearchList isCreatingChat={this.state.isCreatingChat} addingChatUsers={this.state.isAddingUserToChat} isChatContainer={0} />
						: "" 
						
					}
						
					{
					(this.state.isRemovingUsersFromChat) ? 
						<RemoveChatUsersList users={this.state.currentChatUsers}/>: <div></div> 
					}
					
					{
					(this.state.conversationSearchQuery != "" && !this.state.isCreatingChat) ?
						<ConversationSearchList /> : " "
					}
					
					{
					(this.state.conversationSearchQuery == "" && !this.state.isRemovingUsersFromChat && !this.state.isCreatingChat && !this.state.isAddingUserToChat) ?
					   <MessagesPreviewContainer /> : "" 
					   
					}
					
					
              </div>
            </div> : ""
			}
			
			{
				(this.state.isSearchingMessages && !this.state.isCreatingChat)?
					<SearchDialogMessages peer={this.state.search_peer} /> : ""
				}
				
				
			{
            (!this.state.showProgress && !(this.state.isSearchingMessages && !this.state.isCreatingChat) ) ?
            <div style={divCreateChatStyle} className={(!this.state.hideMenu) ? 'container right' : 'container right hide'} id="cRight">
			
			{
				(!this.state.isSearchingMessages || this.state.isCreatingChat)?
				
			
              <div onScroll={this.handleScrollDlg} id="dialog_container_div" className="dialog_container_div">
              { (!this.state.isCreatingChat && !this.state.isSearchingMessages) ? 
                <DialogContainer />
               : ""}
               { 
                (this.state.isCreatingChat && !this.state.isSearchingMessages ) ? 
                  <CreateChatContainer />
                  : ""
                }
              </div> : ""
			}
			  
			  
				
			  {
			  (this.state.showSendMessagePanel && !this.state.isSearchingMessages) ?
              <div style={ imPanelCreateChat } className="im_panel">
                  <SendMessagePanel isCreatingChat={this.state.isCreatingChat} setHeight={this.setHeight} selectedMessages={this.state.isSelectedMessages} /> 
              </div> : "" 
				}
				</div> : (!this.state.isSearchingMessages || this.state.isCreatingChat) ? this.showProgress() : "" }
			     
         </div>
      </div>
    );
  }
}

export default Im;