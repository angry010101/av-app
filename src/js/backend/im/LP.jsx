import MessagesStore from 'js/backend/im/MessagesStore.jsx'

const request = require('superagent');


export function startLongPoll(){
	if (window.test_enableLP == false || typeof test_enableLP == "undefined"){
		return;
	}
     request.get('/execute')
            .query({ startLongPolling: 1, new_pts: window.newPts})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert(err);
              } else {
                var j;
                try {
                 j = JSON.parse(res.text);
                }
                catch(ec){
                  alert("ErrorLP: " + res.text);
                }
                window.test_resultLP = j;
				parseLPResponse(j);
              }
			  startLongPoll(); 
            });
}

function parseLPResponse(t){
	let ts = t.ts;
	window.newPts = ts;
	let updates = t.updates;
	updates.map((e) => {
		switch(e[0]){
			case 8:
				alert(8);
				break;
			case 9: 
				alert(9);
				break;
			case 4:
				alert("message");
				break;
			default:
				return;
		}
	}) ;

}


window.startLongPoll = startLongPoll;
