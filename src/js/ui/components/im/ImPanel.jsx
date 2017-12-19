import React, { Component } from 'react';
import DialogContainer from 'js/ui/components/im/DialogContainer.jsx'
import SendMessagePanel from 'js/ui/components/im/SendMessagePanel.jsx'
import MessagesContainer from 'js/ui/components/im/MessagesContainer.jsx'
import 'css/components/im/im_panel.css'

class ImPanel extends Component {
  constructor(props) {
    super(props);    
    //alert("impanel: " + this.props.users);
    this.state=({
      users: this.props.users
    })
  }

  render() {
    return (
    	<div className="im_panel">
			  <div className="dialog_container_div">
				   <DialogContainer users={this.state.users} id="msg_container" /> 
        </div>
        	<div className="sendmsg_container_div">
            <SendMessagePanel /> 
			    </div>
		  </div>
    );
  }
}

export default ImPanel;


/*
	<MessagesContainer /> 
*/