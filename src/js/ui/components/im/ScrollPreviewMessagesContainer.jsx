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


import dispatcher from "/home/angry/av-app/src.jsx/backend/Dispatcher.jsx"


import * as LPHClient from "/home/angry/av-app/src.jsx/backend/im/LongPollHistoryClient.jsx"



//long poll history there????

class Im extends Component {
  constructor(props){ 
      super(props);
      this.state=({
        selectedConversation: MessagesStore.getSelectedConversation(),

        hideMenu: false,
        
        isSelectedMessages: false,
        conversationSearchResult: 0,

        divstyle: {},
        divheight: 0
      })
      //long poll client
      this.handleScrollPrev = this.handleScrollPrev.bind(this);
      this.handleScrollDlg = this.handleScrollDlg.bind(this);
         
  }


  componentWillMount(){
   
    MessagesStore.on("hideMenu",() =>{
      this.setState({
          hideMenu: MessagesStore.getMenuStatus()
      });
    });

    MessagesStore.on("conversationSearchResult",(result) =>{
      this.setState({
          conversationSearchResult: MessagesStore.getConversationSearchResult()
      });
    });

    MessagesStore.on("changeDialogHeight",(h) =>{
      this.setHeight(h);
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
          if (this.state.selectedMessages.length >= 0)
            this.setState({ isSelectedMessages: true})
          else
            this.setState({ isSelectedMessages: false})
        }
      }); 

      dispatcher.register( dispatch => {
        if (dispatch.type === 'START_SELECTING_MESSAGES'){
          if (this.state.isSelectedMessages === true){
            MessagesStore.resetSelectedMessages();
            this.setState({
              isSelectedMessages: false
            });
          }
        }
      });    

      SearchDialogStore.on("SEARCH_DIALOG_RESPONSE_PARSED",(h) =>{
       this.setState({
          conversationSearchResult: h
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
					     { (this.state.conversationSearchResult === 0) ?
               <MessagesPreviewContainer />
               : <ConversationSearchList /> 
               }
              </div>
            </div>
              
            
            <div className={(!this.state.hideMenu) ? 'container right' : 'container right hide'} id="cRight">
              <div style={this.state.divstyle}  onScroll={this.handleScrollDlg} id="dialog_container_div" className="dialog_container_div">
                <DialogContainer />
              </div>
              <div className="im_panel">
                  <SendMessagePanel setHeight={this.setHeight} attachments="" selectedMessages={0} /> 
              </div>
            </div>
			     
         </div>
      </div>
    );
  }
}

export default ScrollPreviewMessagesContainer;