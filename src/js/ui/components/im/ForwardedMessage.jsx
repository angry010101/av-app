import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'css/components/im/dialog_message.css'
import { formatDate } from 'js/backend/formatDate.jsx'
import DialogAttachments from 'js/ui/components/im/DialogAttachments.jsx' ;


import dispatcher from "js/backend/Dispatcher.jsx"
import UsersStore from 'js/backend/im/UsersStore.jsx'


class ForwardedMessage extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.users.find((e) => e.uid === this.props.msg.uid);
    this.recursive = 0;
    this.state=({
      user: this.user
    });
    if (this.props.recursive == 1){
      this.recursive = 1;
		if (typeof this.user == "undefined"){
			 UsersStore.addUserRequest(e.uid);
		}
	}
	

  }

  componentWillMount(){
    UsersStore.on("ADDED_USER",(u) =>{
      if (u.uid == this.props.msg.uid)
      this.setState({
          user: u
      });
    });
    

  }

  handleFwdMessagesClick(e){
      e.preventDefault();
      e.stopPropagation();
      dispatcher.dispatch({
        type: 'SHOW_SHADOW_VIEW_FWD',
        msgs: this.props.msg.fwd_messages,
        users: this.props.users
    });
    };
      


  render() {
    return (
      <div className="msg_wrapper" >
        <div className="msg_container">
          <div className="msg_img_div">
            <img className="photo_img" src={ 
			(typeof this.state.user != "undefined") ?
             ((this.state.user.photo_50) ? this.state.user.photo_50  : this.state.user.photo) : ""} />
          </div>
          <div className="msg_content_div">
              
              <div className="msg_headers">
                <div className="msg_name_text">
                  {
                    (typeof this.state.user != "undefined") ?
                    ( (this.state.user.first_name) ? this.state.user.first_name + " " + this.state.user.last_name : this.state.user.name ) : ""}
                </div>
                <br />
                  { /*formatDate(this.props.msg.date)*/ }
              </div>
              
              <div className="msg_content">
                <div className="msg_text">

                  { 
                    (this.props.msg.body != "") ?
                    this.props.msg.body.split("<br>").map(function(item) {
                     return (
                      <div>
                        {item}
                        <br/>
                      </div> 
                      )
                    }) : ""
                  
                  }

                  {
                  (typeof this.props.msg.fwd_messages != "undefined" && this.recursive==0) ?
                     (<a onClick={(e) => this.handleFwdMessagesClick(e)}>Forwarded messages</a>)
                     : ""
                  }


                  {
                  (typeof this.props.msg.fwd_messages != "undefined" && this.recursive==1) ?
                     this.props.msg.fwd_messages.map((e) => { return <ForwardedMessage msg={e} users={this.props.users} recursive="1" /> } )
                     : ""
                  }

                </div>

                  {
                    (typeof this.props.msg.attachments != "undefined") ?
                     (<DialogAttachments info={this.props.msg.attachments}/>)
                     : ""
                  }


                     
              </div>
              
          </div>
        </div>  
      </div>
    );
  }
}

export default ForwardedMessage;


//TODO: html template