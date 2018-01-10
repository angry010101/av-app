import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"


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

		this.selectedMessagesConversation = 0
		/*
		this.on("ADDED_USER",(h) =>{
     		 this.startLongPollHistory();
    		});*/


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
		this.addOrUpdPrevMessages(text.messages,text.profiles,c,1);
	}

	addOrUpdPrevMessages(msgs,profiles,c,toend){
		for (var i=0;i<c;i++){
			var cm = this.prevMsgs.find((e) => e.uid === msgs[i].chat_id);
				if (typeof cm != "undefined"){
					var ind = this.prevMsgs.indexOf(cm);
					this.prevMsgs.splice(ind,1);
					var tuser = cm.user;
					var m1 = msgs[i];
					m1.user = tuser;
					this.addPrevMessage(m1);
					//fwd and attachments
					// add offset
					if (this.selectedConversation.chat_id == msgs[i].chat_id){
						window.dlgsOffset++;
						this.addDlgMessage(msgs[i]);
					}
					continue;
				}		

			var cm = this.prevMsgs.find((e) => e.uid === msgs[i].uid);

			if (typeof cm != "undefined"){
				var ind = this.prevMsgs.indexOf(cm);
				this.prevMsgs.splice(ind,1);
				var tuser = cm.user;
				var m1 = msgs[i];
				m1.user = tuser;
				this.addPrevMessage(m1);
				//fwd and attachments
				// add offset
				if (this.selectedConversation.uid == msgs[i].uid){
					window.dlgsOffset++;
					this.addDlgMessage(msgs[i]);
				}
			}
			else {
				window.prevOffset++;
				this.addPrevMessage(msgs[i]);
			}
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
		this.users = this.users.concat(u);
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

	addPrevMessages(m,u,c,tobegin){
		//no update due to offset loading
		

		for (var i=0;i<m.length;i++){
			if (parseInt(m[i].uid)>=0){
				m[i].user = u.find((u) => u.uid === m[i].uid); 
			} 
			else {
				this.loadGroup(m[i].uid)
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

	selectDialog(id,cid){
		this.dlgMsgs = [];
		window.dlgsOffset=0;

		this.selectedConversation = {
			uid: id,
			chat_id: cid
		};
		window.test_selectedConversation = this.selectedConversation;
		this.emit("loadDlgFirst");
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
							b.push(j[i]);
						i++;
					}
				


				if (typeof b[0] == "undefined") {											

						alert("There's no " + window.att_method + "s there");
				}
					this.emit("dialogAttachmentsResponse",b);
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
				case 8:
					alert(8);
					//online
					//c[3] = ts , c[2] = platform , c[1] = -uid
					break;
				case 9: 
					alert(9);
					//offline
					//c[3] = ts , c[2] = platform , c[1] = -uid
					break;
				case 4:
					//alert("message");c[1] = mid, c[3] = from_id , c[4] = time, c[5] = trxt
					let m = { 
						
					}
					this.addDlgMessage(m);
					break;
				case 80:
					//messages count 
					//e[1] == count
					
				default:
					return;
		}
		}) ;
	}

	
	handleActions(a){
		switch(a.type){
			case "SELECT_DIALOG":
				this.selectDialog(a.id,a.chat_id);
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
