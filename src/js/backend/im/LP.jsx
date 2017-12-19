import MessagesStore from 'js/backend/im/MessagesStore.jsx'

const request = require('superagent');

//superagentPromisePlugin.Promise = require('es6-promise');
 
function lp(){
    var xhr = new XMLHttpRequest();

  xhr.open('GET', '/execute?startLongPolling=1&' + "new_pts=" + window.newPts, window.lpFlag);

xhr.send(); // (1)

xhr.onreadystatechange = function() { // (3)
  if (xhr.readyState != 4) return;
  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    var j;
                try {
                 j = JSON.parse(xhr.responseText);
                }
                catch(ec){
                  alert("ErrorLP: " + xhr.responseText);
                }
                window.resultLP = j;
  }
  startLongPoll(); 

}
}


export function startLongPoll(){
     if (typeof window.lastMsgId == "undefined" ){
                    
      return ;
     }
     /*
   window.lpreq = request.get('/execute')
            .query({ startLongPolling: 1, new_pts: window.newPts})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert(err);
                 startLongPoll();
              } else {
                var j;
                try {
                 j = JSON.parse(res.text);
                }
                catch(ec){
                  alert("ErrorLP: " + res.text);
                }
                window.resultLP = j;
                startLongPoll(); 
              }
            });   */

      if (typeof window.lpFlag == "undefined"){
    window.lpFlag = true;
  }
  setTimeout(function(){ lp();},0) ;
}



window.startLongPoll = startLongPoll;
