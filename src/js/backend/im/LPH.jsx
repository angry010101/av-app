import MessagesStore from 'js/backend/im/MessagesStore.jsx'

const request = require('superagent');


export function startLongPollHistory(){
     if (typeof window.lastMsgId == "undefined" ){            
      return ;
     }
     

     request.post('/LPhistory')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ max_msg_id: window.lastMsgId, new_pts: window.newPts})
            .end((err, res) => {
              if (err || !res.ok) {
              } else {
                var j;
                try {
                 j = JSON.parse(res.text);
                }
                catch(ec){

                  alert("ErrorLPH: " + res.text);
                }
                try{
                 MessagesStore.parseLPH(j);
                }
                catch (ec){
                  
                }
              }
              setTimeout(() => { startLongPollHistory(); },window.timeLPH);
            });       
}
