import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"


class HandleHeaderActions extends EventEmitter{
	constructor(){
		super();
	}

	
}

const hhactions = new HandleHeaderActions;
dispatcher.register(function(a){
		switch(a.type){
			case "SELECT":
				alert(a.what);
				break;
			default:
				var a =0;
				break;
		}
		return true;
	});