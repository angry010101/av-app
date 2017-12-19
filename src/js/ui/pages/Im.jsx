import React, { Component } from 'react';
import MessagesPreviewContainer from 'js/ui/components/im/MessagesPreviewContainer.jsx'
import 'css/pages/im.css'
import DialogContainer from 'js/ui/components/im/DialogContainer.jsx'
import SendMessagePanel from 'js/ui/components/im/SendMessagePanel.jsx'
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import ConversationSearch from 'js/ui/components/im/ConversationSearch.jsx'
import ConversationSearchList from 'js/ui/components/im/ConversationSearchList.jsx'
import ConversationTools from 'js/ui/components/im/ConversationTools.jsx'
import SearchDialogStore from 'js/backend/im/SearchDialogStore.jsx'
import { startLoadingDialogMessages } from 'js/backend/im/LoadDialogMessages.jsx'
import { startLoadingPreviewMessages } from 'js/backend/im/LoadPreviewMessages.jsx'
import CreateChatContainer from 'js/ui/components/im/CreateChatContainer.jsx'


import dispatcher from "js/backend/Dispatcher.jsx"


import * as LPHClient from "js/backend/im/LongPollHistoryClient.jsx"



//long poll history there????

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
        divheight: 0
      })
      //long poll client
      this.handleScrollPrev = this.handleScrollPrev.bind(this);
      this.handleScrollDlg = this.handleScrollDlg.bind(this);
      window.selectedMessages = [];
         
  }


  componentWillMount(){

    MessagesStore.on("hideMenu",() =>{
      this.setState({
          hideMenu: MessagesStore.getMenuStatus()
      });
    });


    MessagesStore.on("changeDialogHeight",(h) =>{
      this.setHeight(h);
    });

    

    MessagesStore.on("dlgMessageSelected",(c) =>{
      this.setState({
          isSelectedMessages: c
      });
    });
    MessagesStore.on("selectedMessagesReset",() =>{
      this.setState({
          isSelectedMessages: 0
      });
    });

     dispatcher.register( dispatch => {
        if ( dispatch.type === 'HIDE_BACK_BTN' ) {
          this.setState({ hideMenu: false })
        }
      });

     dispatcher.register( dispatch => {
        if ( dispatch.type === 'SHOW_BACK_BTN' ) {
          this.setState({ hideMenu: !this.state.hideMenu})
        }
      });

     dispatcher.register( dispatch => {
        if (dispatch.type === 'SELECT_DIALOG'){
          if (this.state.isSelectedMessages > 0)
            this.setState({
              selectedConversation: MessagesStore.getSelectedConversation()})
          else
            this.setState({ isSelectedMessages: 0,
              selectedConversation: MessagesStore.getSelectedConversation()})
        }

      }); 

      /*dispatcher.register( dispatch => {
        if (dispatch.type === 'START_SELECTING_DIALOG_MESSAGES'){
          if (this.state.isSelectedMessages === true){
            MessagesStore.resetSelectedMessages();
            this.setState({
              isSelectedMessages: false
            });
          }
        }
      });*/   
      dispatcher.register( dispatch => {
        if (dispatch.type === 'CREATE_CHAT'){
          this.setState({
            isCreatingChat: dispatch.chatState
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

  setHeight(e){
    this.setState({divheight: e});
    let s = "calc(100% - " + parseInt(this.state.divheight) + "px)";
    this.setState({divstyle: {"height": s }});
  }

  handleScrollPrev(e){
      var myDiv = document.getElementById("prev_msg_container");
      if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight - 100) {
          startLoadingPreviewMessages();      
      }              
  }
  
  handleScrollDlg(e){ 
      var myDiv = document.getElementById("dialog_container_div");
      if (myDiv.offsetHeight + myDiv.scrollTop >= myDiv.scrollHeight - 100) {
          startLoadingDialogMessages();
      }              
  }

  render() {
    return (
    	<div className="main_im_div" >
          
      		<div className="content">
            <div className="container left"> 
            {/*  <ConversationTools /> */}
              <ConversationSearch />
				      <div className="container_previev_messages"  id="prev_msg_container"  onScroll={this.handleScrollPrev}>
					     { 
               
                (this.state.isCreatingChat) ?
                <ConversationSearchList isCreatingChat={this.state.isCreatingChat} isChatContainer={0} />
                : 
                (this.state.conversationSearchQuery == "") ?
               <MessagesPreviewContainer />
               : <ConversationSearchList /> 

               }
              </div>
            </div>
              
            
            <div className={(!this.state.hideMenu) ? 'container right' : 'container right hide'} id="cRight">
              <div style={this.state.divstyle}  onScroll={this.handleScrollDlg} id="dialog_container_div" className="dialog_container_div">
              { (!this.state.isCreatingChat) ? 
                <DialogContainer />
               : ""}

               { 
                (this.state.isCreatingChat) ? 
                  <CreateChatContainer />
                  : ""
                }

              </div>
              <div className="im_panel">
                  <SendMessagePanel isCreatingChat={this.state.isCreatingChat} setHeight={this.setHeight} attachments="" selectedMessages={this.state.isSelectedMessages} /> 
              </div> 

               {
                (this.state.isCreatingChat) ? 
                  "" : ""
                }
            </div>
			     
         </div>
      </div>
    );
  }
}

export default Im;