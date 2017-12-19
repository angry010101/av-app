import MessagesStore from 'js/backend/im/MessagesStore.jsx'
import UsersStore from 'js/backend/im/UsersStore.jsx'


const request = require('superagent');

var startedLoadingMorePrev = false;

export function startLoadingPreviewMessages(){    
          if (startedLoadingMorePrev) return ;

          startedLoadingMorePrev = true;

          request.get('/execute')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .query({dialogsOffset: window.prevOffset})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                 var j = JSON.parse(res.text);

                 let c = j.msgs.splice(0,1);
                 MessagesStore.addPrevMessages(j.msgs,j.users,c,0);
                 UsersStore.add(j.users);
                 startedLoadingMorePrev = false;
                 if (window.prevOffset == 0 ){
                    UsersStore.setMe(j.me);
                 }
                 window.prevOffset += 20;
              }
            });
}
