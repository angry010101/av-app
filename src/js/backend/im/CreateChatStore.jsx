import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"

const request = require('superagent');


class CreateChatStore extends EventEmitter{
  constructor(){
    super();
    this.users = [];
    this.title = "DEFAULT TITLE";
  }

  addUser(id){
  	if (this.users.indexOf(id) == -1){
  		this.users.push(id);
  	}

  	this.emit("CHANGED_CHAT_USERS");
  	this.emit("ADDED_CHAT_USER");
  }

  removeUser(id){
  	var i = this.users.indexOf(id);
  	this.users.splice(i,1);

  	this.emit("CHANGED_CHAT_USERS");
  	this.emit("REMOVED_CHAT_USER");
  }

  selectUser(id){
	console.log("select: " + id + "typeof" + typeof(id) ); 
  	if (this.users.indexOf(id) == -1){
  		this.addUser(id);
  	}
  	else {
  		this.removeUser(id);
  	}
  }
  getUsers(){
  	return this.users;
  }

  setTitle(t){
  	this.title = t;
  }

  getTitle(){
  	return this.title;
  }

  handleCreate(){

  }

  containsUser(id){
    var uf = this.users.find(u => u.uid === id); 
    var r = (typeof uf != "undefined") ? true : false; 
    return  r;
  }

  createChat(title){
  	//async request
  	request.post('/createChat')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ title: title, users: this.users.join()})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error creating MEGA POWERFULL CHAT');
              } else {
                var j = JSON.parse(res.text);
  				this.emit("CHAT_CREATED",j);
  			  }
            }); 

  }
}


const createChatStore = new CreateChatStore();
export default createChatStore;