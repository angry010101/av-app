import MessagesStore from 'js/backend/im/MessagesStore.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'
/*
import * as data1 from "/home/angry/av-app/responses/im/getmsgs.jsxon"
*/

const request = require('superagent');

var startedLoadingMoreDlgs = false;

export function startLoadingDialogMessages(){
    
	
	
	if (typeof window.att_offset != "undefined" && window.att_offset != "" ) {
		if (window.startedLoadingMoreDlgsAtt ) {
			
		return
		} 
		loadAttachments();
		return ;
	}
    if (startedLoadingMoreDlgs) return;
    startedLoadingMoreDlgs = true;
	
    var sc = MessagesStore.getSelectedConversation(); 
    var uidr =  sc.uid  
    if (sc.chat_id > 0){
      uidr = parseInt(sc.chat_id) + 2000000000;
    }

    request.post('/getmsg')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ offset: window.dlgsOffset, isChat: sc.chat_id, uid: uidr})
            .end((err, res) => {
             if (err || !res.ok) {
                 alert('Oh no! error');

              } else {
                 var j = JSON.parse(res.text);
                 let c = j.splice(0,1);
                 UsersStore.parseCheckLoad(j);//TODO :fwd messages users parsing

                 MessagesStore.addDlgMessages(j,c);
                 startedLoadingMoreDlgs = false;
                 window.dlgsOffset += 20;
              }
            });      
}

function loadAttachments(){
	window.startedLoadingMoreDlgsAtt = true;
	MessagesStore.dialogAttachmentsRequest(window.att_method);
}