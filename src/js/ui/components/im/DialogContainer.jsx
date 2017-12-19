import React, { Component } from 'react';
import 'css/components/im/dialog_container.css'
import DialogMessage from 'js/ui/components/im/DialogMessage.jsx' ;
//import * as MsgActions from '/home/angry/av-app/src.jsx/backend/im/MsgActions.jsx';
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'
import { startLoadingDialogMessages } from 'js/backend/im/LoadDialogMessages.jsx'


const emptyMessagesDiv = (<div className="empty_messages_div"><a>it is empty and cold</a></div>);

window.dlgsOffset = 0;


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
        selectedMessages: MessagesStore.getSelectedMessages()
      })
    }
    
    componentWillMount(){
     /* MessagesStore.on("dlgMessageSelected",() =>{
        this.setState({
            selectedMessages: MessagesStore.getSelectedMessages()
        });
      });

*/

      MessagesStore.on("loadDlgFirst",() =>{
        window.dlgsOffset = 0;
        startLoadingDialogMessages();
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


      /*dispatcher.register( dispatch => {
        if (dispatch.type === 'MESSAGES_DELETED'){
          MessagesStore.markAsDeleted(dispatch.m,dispatch.fl);          
        }
      }); */
    }

    MessagesContainerFun(props) {
      const count = 0;//??? 
      const msgs = this.state.dialogmsgs;
      var users =  UsersStore.get();
      const me = UsersStore.getMe();
      if (msgs.length === 0) return emptyMessagesDiv;
      const listItems = msgs.map((message) =>
         <ListItem value={message} user={(message.out === 1) ? me[0] : users.find(u => u.uid === message.uid)} users={users}/>
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
 
    render() {
      return this.MessagesContainerFun(); 
    }
}

export default DialogContainer;