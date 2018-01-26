import dispatcher from "js/backend/Dispatcher.jsx"

import SearchMessagesStore from 'js/backend/im/SearchMessagesStore.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'
const request = require('superagent');


window.timeSearch = 601;
var tid;
var isstartedsearch= false;

export function searchMessages(q){
	if (q == ""){
		SearchMessagesStore.parseEmpty();
		return ;
	} 
  if (isstartedsearch){
    setTimeout(function() { searchMessages(q); },1000);
    return; 
  }
	SearchMessagesStore.startSearching(q);
	var f1000 = delay(f,window.timeSearch);
	f1000(q);

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


function f(q){
	isstartedsearch = true;
	/*alert("request messages");
	isstartedsearch = false;
	*/
	request.post('/messages_search')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ q: q, offset: 0})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                isstartedsearch= false;
                var j = JSON.parse(res.text);
                UsersStore.parseCheckLoad(j);
                
				SearchMessagesStore.parse(j);
              }
            }); 
}