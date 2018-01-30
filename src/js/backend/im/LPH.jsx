import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'

const request = require('superagent');



import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   error: "Oh no! An error happened."
 },
 ua: {
   error: "О ні. Трапилася помилка"
 },
 ru: {
   error: "О нет. Случилась ошибка"
 }
});

export function startLongPollHistory(){
     if (typeof window.lastMsgId == "undefined" ){          
		setTimeout(() => { startLongPollHistory(); },window.timeLPH);	 
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

                  alert(strings.error);
                }
				if (window.prevOffset != 0){
					try{
					 UsersStore.addUsers(j.profiles);
					 MessagesStore.parseLPH(j);
					}
					catch (ec){
					  //alert(strings.error)
					}
				}
              }
              setTimeout(() => { startLongPollHistory(); },window.timeLPH);
            });       
}
