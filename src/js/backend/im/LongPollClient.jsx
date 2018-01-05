import { startLongPoll } from 'js/backend/im/LP.jsx'
import { startLongPollHistory } from 'js/backend/im/LPH.jsx'


window.timeLPH = 600;
window.timeLP = 1000;


window.newPts = 0;
window.lastMsgId = 0;
window.startLongPoll = startLongPoll; 
window.startLongPollHistory = startLongPollHistory; 

startLongPollHistory()
//setTimeout(function () { startLongPoll(); },3000);

//if (window.isLoginned == 1) {
//}
/*
MessagesStore.on("startLPH",(h) =>{
    startLongPollHistory();
});
*/