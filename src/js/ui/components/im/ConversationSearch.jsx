import React, { Component } from 'react';
import 'css/components/im/conversation_search.css'

import ExpansionDialog from 'js/ui/components/im/ExpansionDialog.jsx'
import ExpansionImOptions from 'js/ui/components/im/ExpansionImOptions.jsx'
import SearchResult from 'js/ui/components/SearchResult.jsx'
import * as SD from 'js/backend/im/SearchDialog.jsx'


class ConversationSearch extends Component {
  constructor(){
    super();
    this.state=({
      q: ""
    });


  }
  handleChange(e){
  	this.setState({
      q: e.target.value
    });
    e.preventDefault();
    SD.searchDialog(e.target.value,this.props.isChatContainer);
  }

  render() {
    return (
        <div className="im_conversation_search">
          <div>
          	<input className="conversation_search_input" onChange={ (e) => this.handleChange(e) }/>
          </div>
        </div>
    );
  }
}

export default ConversationSearch;