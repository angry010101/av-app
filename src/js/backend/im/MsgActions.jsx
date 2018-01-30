import dispatcher from "js/backend/Dispatcher.jsx"

let creatingChat = false;


export function selectDialog(id,chat_id,mid){
	
	clearAttachments();

	dispatcher.dispatch({
		type: "SELECT_DIALOG",
		id,
		chat_id,
		mid
	});
	
}

export function selectDialogMessage(mid){
	dispatcher.dispatch({
		type: "SELECT_DIALOG_MESSAGE",
		mid
	});
}


export function searchMessages(startedSearching){
	dispatcher.dispatch({
		type: "SHOW_SEARCH_DIALOG_MESSAGES",
		startedSearching
	});
	
	if (startedSearching) this.showBackBtn();
}


export function hideBackBtn(){
	dispatcher.dispatch({
		type: "HIDE_BACK_BTN",
		param: creatingChat
	});
	if (creatingChat){//change to not creating chat
		this.createChat(true);
	}
}

export function showDialogAttachments(t){
	window.att_offset = "";
	window.att_method = t;
	clearAttachments();
	dispatcher.dispatch({
		type: "LOAD_DIALOG_ATTACHMENTS",
		method: t
	});
	dispatcher.dispatch({
		type: "SHOW_PROGRESS"
	});
	
}

export function clearAttachments(){
	window.att_method = "";
	window.att_offset = "";
	dispatcher.dispatch({
		type: "CLEAR_ATTACHMENTS"
	});
	dispatcher.dispatch({
		type: "HIDE_PROGRESS"
	});	
}


export function showBackBtn(p){
	dispatcher.dispatch({
		type: "SHOW_BACK_BTN",
		param: p 
	});
}

export function findConversation(text){
	dispatcher.dispatch({
		type: "FIND_CONVERSATION",
		text
	});
}

export function startSelectingDialogMessages(){
	dispatcher.dispatch({
		type: "START_SELECTING_DIALOG_MESSAGES"
	});	
}

export function changeChatTitle(){
	var t = prompt('Type new chat title', "");
	if (t == "") return ;
	dispatcher.dispatch({
		type: "CHANGE_CHAT_TITLE",
		t
	});	
}

export function addChatUser(a){
	dispatcher.dispatch({
		type: "ADDING_CHAT_USER"
		,adding: a
	});	
	this.hideBackBtn();
}

export function removeChatUser(b){
	dispatcher.dispatch({
		type: "REMOVING_CHAT_USER"
		,removing: b
	});
	
	this.hideBackBtn();
}
export function createChat(isCreatingChat){
		dispatcher.dispatch({
            type: "CREATE_CHAT",
            chatState: !isCreatingChat
        });
		creatingChat = !isCreatingChat;
		if (!isCreatingChat) {
			this.showBackBtn();			
		}
}

