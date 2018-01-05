import MessagesStore from 'js/backend/im/MessagesStore.jsx'

const request = require('superagent');


export function startLongPoll(){
     request.get('/execute')
            .query({ startLongPolling: 1, new_pts: window.newPts})
            .end(function(err, res){
              if (err || !res.ok) {
              } 
			  else {
                var j;
                try {
                 j = JSON.parse(res.text);
                }
                catch(ec){
                }
				MessagesStore.parseLPResponse(j);
              }
			  startLongPoll(); 
            });
}



window.startLongPoll = startLongPoll;
