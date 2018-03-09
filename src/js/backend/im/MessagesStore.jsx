import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"

import UsersStore from 'js/backend/im/UsersStore.jsx'

const request = require('superagent');


class MessagesStore extends EventEmitter{
	constructor(){
		super();
		this.prevMsgsCount = 311; 
		this.prevMsgs = [],
		this.dlgMsgs = [],
		this.dlgMsgsCount = 312;

		this.users = [],
		this.groups = [],

		this.flagAddUserToChat = false;
		
		this.chatUsers =[];
		
		this.me = [],
		this.userstoadd = [],
		this.selectedMessages = [],

		this.selectedDialogs = [],
		
		this.hideMenu = false,
		
		this.conversationSearchResult = [],
		this.selectedConversation = {
			uid: 0,
			chat_id: 0,
			offset: 0
		},
		
		this.attachments = []
		this.selectedMessagesConversation = 0
		/*
		this.on("ADDED_USER",(h) =>{
     		 this.startLongPollHistory();
    		});*/

		this.messageAttachments = []
	}
	
	
	resetAttachments(){
		this.attachments = []
	}
	
	removeMessageAttachment(i){
		this.messageAttachments.splice(i,1) 
		this.emit("MESSAGE_ATTACHMENT_ADDED")
	}
	
	
	resetMessageAttachments(){
		this.messageAttachments = []
		this.emit("MESSAGE_ATTACHMENT_ADDED")
	}
	
	getMessageAttachments(){
		return this.messageAttachments
	}
	
	getMessageAttachmentsFormatted(){
		let a = this.messageAttachments
		let arr = []
		let str = ""
		window.test_att = a
		for (var i = 0 ; i < a.length; i++){
			if (a[i]){
				if (typeof a[i].id == "undefined" && typeof a[i].aid == "undefined"){
					arr.push("doc" + a[i].owner_id + "_" + a[i].did)
				}
				else {
					if (a[i].aid && a[i].title){
						arr.push("audio" + a[i].owner_id + "_" + a[i].aid)
					}
					else {
						arr.push(a[i].id)						
					}
				}
			}
			else {
				
			}
		}
		return arr.join(",")
	}
	
	getAttachments(){
		return this.attachments;
	}
	
	markAsRead(pid,mid){
		var msgprev = this.prevMsgs.find(m => m.mid === mid);
		msgprev.read_state = 1;
		
		this.emit("addedPrevMessages");
		var msg = this.dlgMsgs.find(m => m.mid === mid);		
		
		if (msg){
			while (msg.read_state == 0){
				msg = this.dlgMsgs.find(m => m.mid === mid);
				msg.read_state = 1;
				mid--;
			}
			this.emit("addedDlgMessages");
		}		
	}
	
	markAsReadBeforeId(mid){
		let msgs = this.dlgMsgs
		for (var i=0;i< msgs.length;i++){
			if (msgs[i].mid < mid){
				msgs[i].read_state = 1
			}
		}
		this.dlgMsgs = msgs
	}

	isAddingUserToChat(){
		return flagAddUserToChat;
	}
	changeFlagAddChatUser(b){
		this.flagAddUserToChat = b;
	}
	
	startLPH(){
		if (typeof this.prevMsgs[0] != "undefined" && window.lastMsgId == 0){
            window.lastMsgId = this.prevMsgs[0].mid;
        }
		this.emit("startLPH");
	}

	parseLPH(text){
		if (text.messages[0] != 0)
			window.lastMsgId = text.messages[text.messages[0]].mid;
		if (typeof text.new_pts != "undefined")
			window.newPts = text.new_pts;

		var c = text.messages.splice(0,1);
		this.addUsers(text.profiles);
		this.loadUsersIfNotInMessages(text.messages,text.profiles);
		this.addOrUpdPrevMessages(text.messages,text.profiles,c,1);
	}

	loadUsersIfNotInMessages(m,p){
		let userstoload = [];
		for (var i=0;i<m.length;i++){
			if (UsersStore.getById(m[i].uid)){
				continue
			}
			else {
				userstoload.push(m[i].uid);
			}
		}
		window.test_users_to_add = userstoload;
	}
	
	
	parseMessageAttachment(j){
		this.messageAttachments.push(j[0])
		this.emit("MESSAGE_ATTACHMENT_ADDED")
	}
	
	addOrUpdPrevMessages(msgs,profiles,c,toend){
		
		for (var i=0;i<c;i++){
			var cm = this.prevMsgs.find((e) => { return e.chat_id === msgs[i].chat_id} );
				if (typeof cm != "undefined" && typeof cm.chat_id != "undefined"){
					if(window.debug) alert("add chat msg")
					var ind = this.prevMsgs.indexOf(cm);
					this.prevMsgs.splice(ind,1);
					var tuser = UsersStore.getById(msgs[i].uid);
					let m2 = msgs[i];
					m2.body = "" + msgs[i].body
					m2.user = tuser;
					this.addPrevMessage(m2);
					//fwd and attachments
					// add offset
					if (this.selectedConversation.chat_id == msgs[i].chat_id){
						window.dlgsOffset++;
						this.markAsReadBeforeId(msgs[i].mid);
						this.addDlgMessage(msgs[i]);
					}
					
					
					this.prevMsgs = [].concat(this.prevMsgs)
					this.emit("addedPrevMessages")
					

					continue;
				}		

				//gid ?? id
			var cm = this.prevMsgs.find((e) => (e.uid === msgs[i].uid && typeof e.chat_id == "undefined"));
		
			if (typeof cm != "undefined"){
				var ind = this.prevMsgs.indexOf(cm);
				this.prevMsgs.splice(ind,1);
				var tuser = cm.user;
				if (typeof tuser == "undefined"){
					tuser = UsersStore.getById(msgs[i].uid);
				}
				var m1 = msgs[i];
				m1.user = tuser;
				this.addPrevMessage(m1);
				//fwd and attachments
				// add offset
				if (this.selectedConversation.uid == msgs[i].uid && this.selectedConversation.chat_id<0){
					window.dlgsOffset++;
					this.markAsReadBeforeId(msgs[i].mid);
					this.addDlgMessage(msgs[i]);
				}
			}
			else {
				window.prevOffset++;
				this.addPrevMessage(msgs[i]);
			}
			
					this.prevMsgs = [].concat(this.prevMsgs)
					this.emit("addedPrevMessages")
		}
	}

	getPrevMessages(){
		return this.prevMsgs;
	}

	getPrevMessagesCount(){
		return this.prevMsgsCount;
	}

	getDlgMessages(){
		return this.dlgMsgs;
	}

	getDlgMessagesCount(){
		return this.dlgMsgsCount;
	}


	getUsers(){
		return this.users;
	}

	getMe(){
		return this.me;
	}

	setMe(m){
		this.me = m;
		this.emit("setMe");
	}


	getSelectedMessages(){
		return this.selectedMessages;
	}

	getMenuStatus(){
		return this.hideMenu;
	}

	getConversationSearchResult(){
		return this.conversationSearchResult;
	}

	getSelectedConversation(){
		return this.selectedConversation;
	}

	markAsDeleted(m,fl){
		var ks = Object.keys(m);
		var vs = Object.values(m);
		if (fl){
			this.resetSelectedMessages();
		}
		for (var i=0; i < this.dlgMsgs.length; i++){
			var ind = ks.indexOf(this.dlgMsgs[i].mid);
			if (ind != -1 && vs[ind] == 1){
				this.dlgMsgs[i].deleted = true;
			}
		}

		this.emit("markedDeletedMessages")
	}

	deleteMsg(id,selectedMsg){
		var a = [];
		var str = "Do you really want to delete ";
		if (!selectedMsg || this.selectedMessages.length == 0){
			a.push(id)
			str += "message?";
		}
		else {
			a = this.selectedMessages;
			str += "selected messages?";
		}

		var y = confirm(str);
		
		if (y){
			request.post('/deleteMsgs')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ mids: a})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                 window.res = res;
                 var j = JSON.parse(res.text);
                dispatcher.dispatch({
					type: "MESSAGES_DELETED",
					m: j,
					fl: selectedMsg
					});
              }
            }); 
         } 

	}
	
	containsUser(id){
		var uf = this.users.find(u => u.uid === id); 
		var r = (typeof uf != "undefined") ? true : false; 
		return  r;
	}

	addUser(m){
		//let p = this.prevMsgs.indexOf(mid);
		if (false){
			//return  if is
		}
		else {
			this.users.push(m[0]);
		}
		this.emit("addedUser",m[0]);
	}

	addUserRequest(id){
		if (this.containsUser(id)) return;
		if (this.userstoadd.indexOf(id) == -1)
			this.userstoadd.push(id)

	}

	loadUsers(){
		if (this.userstoadd.length == 0) return; 
		
              
         this.userstoadd = [];
	}

	selectedDialog(uid,chat_id){
		var i = this.selectedDialogs.indexOf(uid) 
		if (i == -1){
			this.selectedDialogs.push(uid);
		}
		else {
			this.selectedDialogs.splice(i,1);
		}
		window.selectedDialogs = this.selectedDialogs;
	}


	addUsers(u){
		//no update due to offset loading
		let tu =[];
		for (var i=0;i<u.length;i++){
			if (u[i].last_name == ""){
				let tu1 = u[i];
				tu1.id = parseInt(u[i].id) - 1000000000;
				tu.push(tu1);
			} 
			else {
				tu.push(u[i])
			}
		}
		this.users = this.users.concat(tu);
		//check???
		//this.prevMsgsCount = c;
		this.emit("addedUsers");
	}

	addPrevMessage(m){
		//let p = this.prevMsgs.indexOf(mid);
		if (false){
			//update if is
		}
		else {
			let a = [];
			a.push(m);
			a = a.concat(this.prevMsgs);
			//add if not
			this.prevMsgs = a;
		}
		this.prevMsgsCount++;
		this.emit("addedPrevMessage");
	}

	addPrevMessages(m,u,groups,c,tobegin){
		//no update due to offset loading
		

		for (var i=0;i<m.length;i++){
			if (parseInt(m[i].uid)>=0){
				m[i].user = u.find((u) => u.uid === m[i].uid); 
			} 
			else {
				m[i].user = groups.find((g) => g.gid === (parseInt(m[i].uid)/-1));
				//this.loadGroup(m[i].uid)
			}
		}
		if (tobegin == 0){
			this.prevMsgs = this.prevMsgs.concat(m);
		}
		else {
			this.prevMsgs = m.concat(this.prevMsgs);
		}
		//check???
		//this.prevMsgsCount = c;
		this.emit("addedPrevMessages");
	}

	loadGroup(id){
		request.post('/getGroup')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ group_id: id})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                 window.res = res;
                 var j = JSON.parse(res.text);
                dispatcher.dispatch({
					type: "LOADED_GROUP",
					r: j
					});
              }
            }); 
	}

	addGroup(r){
		this.groups.push(r[0]);
		this.emit("ADDED_GROUP",r[0].gid);
	}

	getGroup(id){
		return this.groups.find((e) => e.gid === id);
	}

	addDlgMessage(m){
		//let p = this.prevMsgs.indexOf(mid)
			//add if not
		let a = [];
		a.push(m);
		a = a.concat(this.dlgMsgs);
		this.dlgMsgs = a;
		this.dlgMsgsCount++;
		this.emit("addedDlgMessage");
	}

	addDlgMessages(m,c){
		//no update due to offset loading
		this.dlgMsgs = this.dlgMsgs.concat(m);
		//check???
		//this.prevMsgsCount = c;
		this.emit("addedDlgMessages");
	}


	hideMenuChange(){
		this.hideMenu = !this.hideMenu;
		this.emit("hideMenu");
	}

	selectDialogMessage(mid){	
		if (this.selectedConversation.uid != this.selectedMessagesConversation){
			this.resetSelectedMessages();
			this.selectedMessagesConversation = this.selectedConversation.uid;
		}
		var p = this.selectedMessages.indexOf(mid);
		
		if (p == -1){
			this.selectedMessages.push(mid);
		}
		else {
			this.selectedMessages.splice(p,1);
		}
		window.selectedMessages = this.selectedMessages;
      
		this.emit("dlgMessageSelected",this.selectedMessages.length);
	}


	resetSelectedMessages(){
		this.selectedMessages = [];
		window.selectedMessages = [];
		this.emit("selectedMessagesReset");
	}

	selectDialog(id,cid,mid){
		this.dlgMsgs = [];
		window.dlgsOffset=0;
		this.resetAttachments();
		this.selectedConversation = {
			uid: id,
			chat_id: cid
		};
		window.test_selectedConversation = this.selectedConversation;
		this.emit("loadDlgFirst",mid);
		//this.emit("addedDlgMessages");
	}

	startConversationSearch(text){
		this.conversationSearchResult = [];
		this.emit("conversationSearchResult",1,text);
	}


	sendMessage(){

	}
	
	dialogAttachmentsRequest(m,o){
		window.att_method = m;
		let p = this.selectedConversation.uid;
		if (this.selectedConversation.chat_id > 0){
			p = 2000000000 + parseInt(this.selectedConversation.chat_id)
		}
		
		request.post('/getattachments')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ method: m, pid: p, offset: window.att_offset})
            .end((err, res) => {
              if (err || !res.ok) {
                 alert(err);
              } else {
                var j;
                try {
                 j = JSON.parse(res.text);
                }
                catch(ec){
                  alert("ErrorLoading response: " + res.text);
                }
                try{
					dispatcher.dispatch({
							type: "HIDE_PROGRESS"
					});	
					let b = [];
						let i=1;
						while(typeof j[i] != "undefined") {
							let temp_elem = j[i];							
							b.push(temp_elem);
						i++;
					}
				


				if (typeof b[0] == "undefined") {											

						alert("There's no " + window.att_method + "s there");
				}
				this.attachments = this.attachments.concat(b);
					this.emit("dialogAttachmentsResponse");
				  window.att_offset = j.next_from;
				  window.startedLoadingMoreDlgsAtt = false;
                }
                catch (ec){
                  
                }
              }
            });   
	}
	
	chatAction(m,t,cb){
		
		request.post('/chatAction')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ method: m, cid: this.selectedConversation.chat_id, param: t})
            .end((err, res) => {
              if (err || !res.ok) {
                 alert(err);
              } else {
                var j;
                try {
                 j = JSON.parse(res.text);
                }
                catch(ec){
                  alert("ErrorLoading response: " + res.text);
                }
                try{
					if (cb){
						cb();
					}
					if (m == "get_users"){
						this.addUsers(j);
						this.emit("loaded_chat_users",j);
						
					}
					else {					
						alert("success changing title to" + t);
						window.test_ca = j; 
					}
                }
					
                catch (ec){
                  
                }
              }
            });   	
	}
	
	addChatUser(){
		this.flagAddUserToChat = true;
	}
	cancelAddingUser(){
		this.flagAddUserToChat = false;
	}
	
	addUserToChat(id){
		this.chatAction("add_user",id);
	}
	
	parseLPResponse(t){
		let ts = t.ts;
		window.newPts = ts;
		let updates = t.updates;
		updates.map((e) => {
			switch(e[0]){
				case 6: 
					//read income
					this.markAsRead(e[1],e[2]);
				case 7: 
					//read outcome
					this.markAsRead(e[1],e[2]);
				case 8:
					//online
					UsersStore.setOnline(Math.abs(e[1]),1)
					break;
				case 9: 
					//offline
					UsersStore.setOnline(Math.abs(e[1]),0)
					break;
				case 4:
					//uid from id bug !!!!!!
					let m = { 
						mid: e[1],
						from_id: e[3],
						uid: e[3],
						date: e[4],
						body: c[5],
						read_state:	0
					}
					let arr = [];
					arr.push(m);
					this.addOrUpdPrevMessages(arr,UsersStore.get(),1,1);
					break;
				case 61:
					//typing dialog
					this.emit("user_typing",e[1]);
					break;
				case 62:
					//typing conversation
					this.emit("user_typing",e[1],e[2]);
					break;
				case 80:
					//messages count 
					//e[1] == count
					break;
				
				default:
					return;
		}
		}) ;
	}

	
	handleActions(a){
		switch(a.type){
			case "SELECT_DIALOG":
				this.selectDialog(a.id,a.chat_id,a.mid);
				this.hideMenuChange();
				break;
			case "BACK_BUTTON":
				this.hideMenuChange();
				break;
			case "SELECT_DIALOG_MESSAGE":
				this.selectDialogMessage(a.mid);
				break;
			case "FIND_CONVERSATION":
				this.startConversationSearch(a.text);
				break;
			case "ADDED_USER":
				this.addUser(a.user);
				break;
			case "LOADED_GROUP":
				this.addGroup(a.r);
				break;
			case "LOAD_DIALOG_ATTACHMENTS":
				this.dialogAttachmentsRequest(a.method);
				break;
			case "CHANGE_CHAT_TITLE":
				this.chatAction("change_title",a.t);
				break;
			case "REMOVING_CHAT_USER":
				if (!a.removing) return ;
				this.chatAction("get_users",0);
				break;
			case "CLEAR_ATTACHMENTS":
				this.attachments = []
				break;
			default:
			break;
		}
		return true;
	}
}

const messagesStore = new MessagesStore;
dispatcher.register(messagesStore.handleActions.bind(messagesStore));
/*window.dispatcher = dispatcher;
*/
window.messagesStore = messagesStore;
export default messagesStore;
