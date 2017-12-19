import dispatcher from "js/backend/Dispatcher.jsx"

export function hideShadowView(){
	dispatcher.dispatch({
		type: "HIDE_SHADOW_VIEW"
	});
}


export function hideShadowViewFwd(){
	dispatcher.dispatch({
		type: "HIDE_SHADOW_VIEW_FWD"
	});
}



export function showShadowView(t,i){
	dispatcher.dispatch({
		type: "SHOW_SHADOW_VIEW",
		type_attachment: t,
		i
	});
}