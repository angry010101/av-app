import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"


class SearchDialogStore extends EventEmitter{
	constructor(){
		super();
		this.res = [];
		this.q = "";
	}

	parse(text,isChatContainer){
		this.res = text;
		this.emit("SEARCH_DIALOG_RESPONSE_PARSED",this.q,isChatContainer,this.res);
	}

	getResponse(){
		return this.res;
	}

	getQuery(){
		return this.q;
	}

	startSearching(q){
		this.q = q;
		this.emit("SEARCH_DIALOG_STARTED",q);
	}
	

	handleActions(a){
		switch(a.type){
			case "qwe":
				break;
			default:
			break;
		}
		return true;
	}
}

const searchDialogStore = new SearchDialogStore;
dispatcher.register(searchDialogStore.handleActions.bind(searchDialogStore));
export default searchDialogStore;
