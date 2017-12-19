import dispatcher from "js/backend/Dispatcher.jsx"

export function select(what){
	dispatcher.dispatch({
		type: "SELECT",
		what
	});
}

/*

export function backBtn(){
	dispatcher.dispatch({
		type: "BACK_BUTTON"
	});
}

export function findConversation(text){
	dispatcher.dispatch({
		type: "FIND_CONVERSATION",
		text
	});
}*/