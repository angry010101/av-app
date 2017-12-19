import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"
import ReactDOM from 'react-dom';


class HandleShadowViewActions extends EventEmitter{
	constructor(){
		super();
	}

	handleActions(a){
		switch(a.type){
			case "HIDE_SHADOW_VIEW":
				a.type_attachment
				a.i
				
				//document.getElementById("shadow_view_wrapper").style.display = "none";
				break;
			case "SHOW_SHADOW_VIEW":
				a.type_attachment;
				a.i;
				//document.getElementById("shadow_view_wrapper").style.display = "block";
				break;
			default:
				var a =0;
				break;
		}
		return true;
	}
	
}

const h = new HandleShadowViewActions();
dispatcher.register(h.handleActions.bind(this));