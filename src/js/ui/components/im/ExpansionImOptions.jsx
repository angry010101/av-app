import React, { Component } from 'react';
import 'css/components/im/im_expansion_dlg.css';


import * as MsgActions from 'js/backend/im/MsgActions.jsx'
import * as SD from 'js/backend/im/SearchDialog.jsx'


	  
import dispatcher from "js/backend/Dispatcher.jsx"




import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   create_chat: "Create chat",
   cancel_chat: "Cancel creating chat"
 },
 ua: {
   create_chat: "Створити бесіду",
   cancel_chat: "Припинити створювання бесіди"
 },
 ru: {
   create_chat: "Создать беседу",
   cancel_chat: "Отменить создание беседы"
 }
});

class ExpansionImOptions extends Component {
     constructor(props){
        super(props);
        this.handleClick  = this.handleClick.bind(this);
        this.state={
            isCreatingChat: false
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
	
	componentDidMount(){
		
		dispatcher.register( dispatch => {
        if ( dispatch.type === 'HIDE_BACK_BTN' ) {
			if (this.state.isCreatingChat)
          this.setState({ isCreatingChat: !this.state.isCreatingChat})
        }
      });
	  
	}

    render() {
        var text_chat = (this.state.isCreatingChat) ?  strings.cancel_chat : strings.create_chat
        return (
            <div>
              <ul>
                <li><a onClick={(e) => this.handleCreateChat(e) }>{text_chat}</a></li>
                {/*<li><a onClick={(e) => this.handleClick(e,"contacts") }>Contacts</a></li>
                <li><a onClick={(e) => this.handleClick(e,"settings") }>Settings</a></li>
              */}</ul>
            </div>
    );
  }
}


export default ExpansionImOptions;
