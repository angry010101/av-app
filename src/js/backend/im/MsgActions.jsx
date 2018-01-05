import dispatcher from "js/backend/Dispatcher.jsx"

export function selectDialog(id,chat_id){
	
	clearAttachments();
	
	dispatcher.dispatch({
		type: "SELECT_DIALOG",
		id,
		chat_id
	});
}

export function selectDialogMessage(mid){
	dispatcher.dispatch({
		type: "SELECT_DIALOG_MESSAGE",
		mid
	});
}


export function hideBackBtn(){
	dispatcher.dispatch({
		type: "HIDE_BACK_BTN"
	});
}

export function showDialogAttachments(t){
	window.att_offset = "";
	window.att_method = t;
	clearAttachments();
	dispatcher.dispatch({
		type: "LOAD_DIALOG_ATTACHMENTS",
		method: t
	});
	
	
}

export function clearAttachments(){
	window.att_emthod = "";
	window.att_offset = "";
	dispatcher.dispatch({
		type: "CLEAR_ATTACHMENTS"
	});
}


export function showBackBtn(){
	dispatcher.dispatch({
		type: "SHOW_BACK_BTN"
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
}

export function removeChatUser(b){
	dispatcher.dispatch({
		type: "REMOVING_CHAT_USER"
		,removing: b
	});
}
