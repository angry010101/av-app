import React, { Component } from 'react';
import 'css/components/im/im_expansion_dlg.css';

import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import dispatcher from "js/backend/Dispatcher.jsx"

import * as SD from 'js/backend/im/SearchDialog.jsx'


class ExpansionDialog extends Component {
    constructor(props){
        super(props);
     	
		this.state=({
            isCreatingChat: false,
			selectedConversation: MessagesStore.getSelectedConversation(),
			isAddingChatUser: false,
			isRemovingChatUser: false
        });
    }

	componentDidMount(){
		MessagesStore.on("loadDlgFirst",(data) =>{
			this.setState({
				selectedConversation: MessagesStore.getSelectedConversation()
			});
		});
	}	
	
    handleClick(e,param){
		//addchatuser chat_id user_id
		
		//removechatuser chat_id user_id 
		
		//deleteChatPhoto chat_id
		//set title
		//setChatPhoto chat is uploadserver

		switch(param){
			case "doc":
				MsgActions.showDialogAttachments("doc");
				break;
			case "photos":
				MsgActions.showDialogAttachments("photo");
				break;
			case "videos":
				MsgActions.showDialogAttachments("video");			
				break;
			case "chat_add_user":
				this.setState({isAddingChatUser: true})
				MsgActions.addChatUser(true);
				SD.searchDialog("");
				break;
			case "chat_add_user_cancel":
				this.setState({isAddingChatUser: false})
				MsgActions.addChatUser(false);
				break;
					
			case "chat_remove_user":
				this.setState({isRemovingChatUser: true});
				MsgActions.removeChatUser(true);
				break;
			case "chat_remove_user_cancel":
				this.setState({isRemovingChatUser: false});
				MsgActions.removeChatUser(false);
				break;
				
				
			case "chat_change_cover": 
				break;
			case "chat_change_title": 
				MsgActions.changeChatTitle();
				break;
			case "back":
				MsgActions.clearAttachments();
				break;
			default:
				break;
		}
	}

    render() {
        return (
            <div>
              <ul>
			  { (this.state.selectedConversation.uid > 0 || this.state.selectedConversation.chat_id > 0) ? 
                <div><li><a onClick={(e) => this.handleClick(e,"doc")}>Documents</a></li>
                <li><a onClick={(e) => this.handleClick(e,"photos")}>Photos</a></li>
                <li><a onClick={(e) => this.handleClick(e,"videos")}>Videos</a></li>
				<li><a onClick={(e) => this.handleClick(e,"back")}>Back to conversation</a></li>
					</div> : ""
			  }
				{
					(this.state.selectedConversation.chat_id > 0) ? 
						<div>
						{(!this.state.isAddingChatUser) ? 
						<li><a onClick={(e) => this.handleClick(e,"chat_add_user")}>Add users</a></li>
						: 
						<li><a onClick={(e) => this.handleClick(e,"chat_add_user_cancel")}>Cancel adding users</a></li>
						}
						{
							(!this.state.isRemovingChatUser) ?
								<li><a onClick={(e) => this.handleClick(e,"chat_remove_user")}>Remove users</a></li>
							:
								<li><a onClick={(e) => this.handleClick(e,"chat_remove_user_cancel")}>Stop Removing users</a></li>
						}
						<li><a onClick={(e) => this.handleClick(e,"chat_change_cover")}>Change cover</a></li>
						<li><a onClick={(e) => this.handleClick(e,"chat_change_title")}>Change title</a></li>
						
						</div>: ""
				}
                {/*<li><a>Voice messages</a></li>*/}
              </ul>
            </div>
    );
  }
}


export default ExpansionDialog;