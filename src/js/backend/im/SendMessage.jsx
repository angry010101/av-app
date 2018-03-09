import request from "superagent";


export function send(m,uid,cid,att){
	request
	.post('/im')
	.set('Content-Type', 'application/x-www-form-urlencoded')
	.send({ msg: m, toid: uid, chat_id: cid, attachment: att,fwd_messages: window.selectedMessages })
	.end((err, res) => {
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                 window.sendMsg = res;
                 //mid = res;
                 window.photo_id = null;
              }
            }); 

}