import dispatcher from "js/backend/Dispatcher.jsx"

import SearchDialogStore from 'js/backend/im/SearchDialogStore.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'
const request = require('superagent');


window.timeSearch = 601;
var tid;
var isstartedsearch= false;
export function searchDialog(q,isChatContainer){
  if (isstartedsearch){
    setTimeout(function() { searchDialog(q,isChatContainer); },1000);
    return; 
  }
	SearchDialogStore.startSearching(q);
	var f1000 = delay(f,window.timeSearch);
	f1000(q,isChatContainer);

}

function delay(f, ms) {

  return function() {
    var savedThis = this;
    var savedArgs = arguments;
    if (typeof tid != "undefined"){
    	clearTimeout(tid);
    }
    tid = setTimeout(function() {
      f.apply(savedThis, savedArgs);
    }, ms);
  };

}


function f(q,isChatContainer){
	isstartedsearch = true;
	request.post('/messages_searchDialogs')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ q: q})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                isstartedsearch= false;
                var j = JSON.parse(res.text);
                UsersStore.parseCheckLoad(j);
                SearchDialogStore.parse(j,isChatContainer);
              }
            }); 
}