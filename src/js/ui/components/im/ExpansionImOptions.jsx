import React, { Component } from 'react';
import dispatcher from "js/backend/Dispatcher.jsx"
import 'css/components/im/im_expansion_dlg.css';


import * as SD from 'js/backend/im/SearchDialog.jsx'


class ExpansionImOptions extends Component {
     constructor(props){
        super(props);
        this.handleClick  = this.handleClick.bind(this);
        this.state={
            isCreatingChat: false
        };
        this.handleCreateChat  = this.handleCreateChat.bind(this);
    }

    handleClick(e,l){
        alert("expansion: " + l);
    }

    handleCreateChat(e){
        e.preventDefault();
        var x = this.state.isCreatingChat;
        dispatcher.dispatch({
            type: "CREATE_CHAT",
            chatState: !x
        });
        this.setState({
            isCreatingChat: !x
        });
        SD.searchDialog("");
    }

    render() {
        var text_chat = (this.state.isCreatingChat) ?  "Cancel creating chat" : "New convrsation"
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
