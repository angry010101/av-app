import React, { Component } from 'react';
import 'css/components/im/im_expansion_dlg.css';
import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import * as SD from 'js/backend/im/SearchDialog.jsx'
import dispatcher from "js/backend/Dispatcher.jsx"

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   create_chat: "Create chat",
   cancel_chat: "Cancel creating chat",
   search: "Search messages",
   cancel_search: "Cancel search"
 },
 ua: {
   create_chat: "Створити бесіду",
   cancel_chat: "Припинити створювання бесіди",
   search: "Пошук повідомлень",
   cancel_search: "Припинити пошук"
 },
 ru: {
   create_chat: "Создать беседу",
   cancel_chat: "Отменить создание беседы",
   search: "Поиск сообщений",
   cancel_search: "Прекратить поиск"
 }
});

class ExpansionImOptions extends Component {
     constructor(props){
        super(props);
        this.handleClick  = this.handleClick.bind(this);
        this.state={
            isCreatingChat: false,
			searchMessages: false
        };
    }

    handleClick(e,l){
        alert("expansion: " + l);
    }

    handleCreateChat(e){
        e.preventDefault();
        var x = this.state.isCreatingChat;
		MsgActions.createChat(x);
        
        this.setState({
            isCreatingChat: !x
        });
        SD.searchDialog("");
    }
	
	
    handleCreateSearch(e){
        e.preventDefault();
		this.setState({
			searchMessages: !this.state.searchMessages
		});	
		MsgActions.searchMessages(!this.state.searchMessages);
    }
	
	
	componentDidMount(){		
		dispatcher.register( dispatch => {
        if ( dispatch.type === 'HIDE_BACK_BTN' ) {
			if (this.state.isCreatingChat)
          this.setState({ isCreatingChat: !this.state.isCreatingChat})
        }
      });
	  
	}

    render() {
        var text_chat = (this.state.isCreatingChat) ?  strings.cancel_chat : strings.create_chat ;
		var search_msgs = (!this.state.searchMessages) ?  strings.search : strings.cancel_search ;
        return (
            <div>
              <ul>
				{
					(!this.state.searchMessages) ? 
					<div>
						<li><a onClick={(e) => this.handleCreateChat(e) }>{text_chat}</a></li> 
					</div> : ""
				}
				{
					
					(!this.state.isCreatingChat) ?
					<div>
						<li><a onClick={(e) => this.handleCreateSearch(e) }>{search_msgs}</a></li>					
					</div> : "" 
				}
              </ul>
            </div>
		);
  }
}


export default ExpansionImOptions;
