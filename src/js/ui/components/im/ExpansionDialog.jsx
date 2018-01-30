import React, { Component } from 'react';
import 'css/components/im/im_expansion_dlg.css';

import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import dispatcher from "js/backend/Dispatcher.jsx"

import * as SD from 'js/backend/im/SearchDialog.jsx'





import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   documents: "Documents",
   photos: "Photos",
   videos: "Videos",
   return_to_conversation: "Back to conversation",
   change_title: "Change chat title",
   
   add_users: "Add users to chat",
   cancel_adding_users: "Cancel adding users to chat",
   remove_users: "Remove users from chat",
   cancel_removing_users: "cancel removing users from chat"
 },
 ua: {
   documents: "Документи",
   photos: "Старі фотографії",
   videos: "Відеозаписи",
   return_to_conversation: "Повернутися до діалогу",
   change_title: "Змінити назву бесіди",
   
   add_users: "Додати користувачів",
   cancel_adding_users: "Припинити додавати користувачів",
   remove_users: "Видалити з бесіди",
   cancel_removing_users: "Припинити видалення з бесіди"
 },
 ru: {
   documents: "Документи",
   photos: "Фото",
   videos: "Видео",
   return_to_conversation: "Вернуться к беседе",
   change_title: "Изменить название беседы",
   
   add_users: "Добавить пользователя",
   cancel_adding_users: "Прекратить добавлять пользователей",
   remove_users: "Удалить из беседы",
   cancel_removing_users: "Прекратить удаление с беседы"
 }
});


class ExpansionDialog extends Component {
    constructor(props){
        super(props);
     	
		this.state=({
            isCreatingChat: false,
			selectedConversation: MessagesStore.getSelectedConversation(),
			isAddingChatUser: false,
			isRemovingChatUser: false,
			showingAttachment: false
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
				this.setState({
					showingAttachment: true
				});
				MsgActions.showDialogAttachments("doc");
				break;
			case "photos":
				this.setState({
					showingAttachment: true
				});
				MsgActions.showDialogAttachments("photo");
				break;
			case "videos":
				this.setState({
					showingAttachment: true
				});
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
				this.setState({
					showingAttachment: false
				});
				MsgActions.clearAttachments();
				break;
			default:
				break;
		}
	}

    render() {
        return (
            <div>
              <ul className="ul_inline">
			  { (this.state.selectedConversation.uid != 0 || this.state.selectedConversation.chat_id > 0) ? 
                (!this.state.showingAttachment) ? 
                <div className="attachments_table">
                <li><a onClick={(e) => this.handleClick(e,"photos")}><img src="http://qwertyangry.pythonanywhere.com/static/images/photos.png" title={strings.photos}/></a></li>
                <li><a onClick={(e) => this.handleClick(e,"videos")}><img src="http://qwertyangry.pythonanywhere.com/static/images/video.png" title={strings.videos}/></a></li>
				<li><a onClick={(e) => this.handleClick(e,"doc")}><img src="http://qwertyangry.pythonanywhere.com/static/images/docs.svg" title={strings.documents}/></a></li>
					</div> : <div className="attachments_table"><li><a onClick={(e) => this.handleClick(e,"back")}><img src="http://qwertyangry.pythonanywhere.com/static/images/return.png" title={strings.return_to_conversation}/></a></li></div> : ""
			  }
				{
					(this.state.selectedConversation.chat_id > 0) ? 
						<div>
						{
							(!this.state.isRemovingChatUser) ? 
							(!this.state.isAddingChatUser) ? 
						<li><a onClick={(e) => this.handleClick(e,"chat_add_user")}>{strings.add_users}</a></li>
						: 
						<li><a onClick={(e) => this.handleClick(e,"chat_add_user_cancel")}>{strings.cancel_adding_users}</a></li>
						: ""
						}
						{(!this.state.isAddingChatUser) ?
							(!this.state.isRemovingChatUser) ? 
								<li><a onClick={(e) => this.handleClick(e,"chat_remove_user")}>{strings.remove_users}</a></li>
							:
								<li><a onClick={(e) => this.handleClick(e,"chat_remove_user_cancel")}>{strings.cancel_removing_users}</a></li>
								: ""
						}
						{/*<li><a onClick={(e) => this.handleClick(e,"chat_change_cover")}>Change cover</a></li>*/}
						<li><a onClick={(e) => this.handleClick(e,"chat_change_title")}>{strings.change_title}</a></li>
						
						</div>: ""
				}
                {/*<li><a>Voice messages</a></li>*/}
              </ul>
            </div>
    );
  }
}


export default ExpansionDialog;