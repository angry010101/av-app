import dispatcher from "js/backend/Dispatcher.jsx"

export function selectDialog(id,chat_id){
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