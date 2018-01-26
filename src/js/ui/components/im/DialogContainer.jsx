import React, { Component } from 'react';
import 'css/components/im/dialog_container.css'
import DialogMessage from 'js/ui/components/im/DialogMessage.jsx' ;
//import * as MsgActions from '/home/angry/av-app/src.jsx/backend/im/MsgActions.jsx';
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'
import { startLoadingDialogMessages } from 'js/backend/im/LoadDialogMessages.jsx'

import DialogAttachments from 'js/ui/components/im/DialogAttachments.jsx' ;

import dispatcher from "js/backend/Dispatcher.jsx"

const emptyMessagesDiv = (<div className="empty_messages_div"><a>it is empty and cold</a></div>);

window.dlgsOffset = 0;


const style_load_documents_link = {
	"margin-left": "8px",
	"font-family": "Arial"
}

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   load_more: "Load more...",
   empty_container: "it is empty and cold"
 },
 ua: {
   load_more: "Завантажити ще...",
   empty_container: "тут порожньо та холодно"
 },
 ru: {
   load_more: "Загрущить ещё...",
   empty_container: "тут пусто и холодно"
 }
});


function ListItem(props) {
  
  return (<div>
      <li>
        <DialogMessage key={props.value.mid} contents={props.value} user={props.user} users={props.users}/> 
      </li>
      </div>);
}

class DialogContainer extends Component {
    constructor(props) {
      super(props);
      this.state=({
        dialogmsgs: MessagesStore.getDlgMessages(),
        selectedMessages: MessagesStore.getSelectedMessages(),
		dialogAttachments: []
      })
    }
    
    componentWillMount(){
     /* MessagesStore.on("dlgMessageSelected",() =>{
        this.setState({
            selectedMessages: MessagesStore.getSelectedMessages()
        });
      });

*/

      MessagesStore.on("loadDlgFirst",(mid) =>{
        window.dlgsOffset = 0;
        startLoadingDialogMessages(mid);
      });
    
      MessagesStore.on("addedDlgMessage",() =>{
        this.setState({
            dialogmsgs: MessagesStore.getDlgMessages(),
            dialogmsgscount: MessagesStore.getDlgMessagesCount()
        });
      });
      MessagesStore.on("addedDlgMessages",() =>{
        this.setState({
            dialogmsgs: MessagesStore.getDlgMessages(),
            dialogmsgscount: MessagesStore.getDlgMessagesCount()
        });
      });



      MessagesStore.on("markedDeletedMessages",(h) =>{
         this.setState({
            dialogmsgs: MessagesStore.getDlgMessages(),
            dialogmsgscount: MessagesStore.getDlgMessagesCount()
         });
      }); 
	  

	 
		MessagesStore.on("dialogAttachmentsResponse",(data) =>{
			window.test_dialogAttachments = data;
			this.setState({
				dialogAttachments: this.state.dialogAttachments.concat(data)
			});
		});

      dispatcher.register( dispatch => {
        if (dispatch.type === 'CLEAR_ATTACHMENTS'){
          this.setState({
			dialogAttachments: []
		  })        
        }
      });
    }

	componentDidMount(){
	  
		
	}
    MessagesContainerFun(props) {
		const count = 0;//??? 
      const msgs = this.state.dialogmsgs;
      var users =  UsersStore.get();
      const me = UsersStore.getMe();
	  const groups = UsersStore.getGroups();
      if (msgs.length === 0) return emptyMessagesDiv;
      const listItems = msgs.map((message) =>
         <ListItem value={message} user={(message.out === 1) ? me[0] : ((users.find(u => u.uid === message.uid)) ?  users.find(u => u.uid === message.uid) : groups.find(g => g.gid === (message.uid)/-1) )} users={users}/>
      );
	  

      //MessagesStore.loadUsers();
      return (
        <div id="msg_container">
          <ul className="list_messages_container">
            { listItems }
          </ul>
        </div>
		);
	}
	  
	 emptyDiv(t){
		return (<div className="empty_messages_div"><a>There's no {t}s there</a></div>);
	 }
	 
	 
	dialogAttachmentsFun(props) {
		var data =  this.state.dialogAttachments;
      const a = data;
	  
	  if (typeof a[0] == "undefined") return this.emptyDiv(window.att_method);
		  
	  return <div><DialogAttachments info={a}/>
		  <a onClick={(e) => startLoadingDialogMessages()} style={ style_load_documents_link} >{strings.load_more}</a></div>
	}
	
	getRender(){
	
		if (typeof this.state.dialogAttachments[0] != "undefined" )
			{ return this.dialogAttachmentsFun(); }
		else {
			return this.MessagesContainerFun(); 
		}
	}
	
 
    render() {
		return this.getRender();
    }
}

export default DialogContainer;