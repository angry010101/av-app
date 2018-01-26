import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"


class SearchMessagesStore extends EventEmitter{
	constructor(){
		super();
		this.res = [];
		this.count = 0;
		this.q = "";
	}

	parse(text){
		this.count = text.splice(0,1);
		this.res = text;
		this.emit("SEARCH_MESSAGES_RESPONSE_PARSED",this.q);
	}

	parseEmpty(){
		this.res = [];
		this.count = 0;
		this.emit("SEARCH_MESSAGES_RESPONSE_PARSED",this.q);
	}
	getResponse(){
		return this.res;
	}

	getQuery(){
		return this.q;
	}

	getCount(){
		return this.count;
	}
	startSearching(q){
		this.q = q;
		this.emit("SEARCH_MESSAGES_STARTED",q);
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

const searchMessagesStore = new SearchMessagesStore;
dispatcher.register(searchMessagesStore.handleActions.bind(searchMessagesStore));
export default searchMessagesStore;
