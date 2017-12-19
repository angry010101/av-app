import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"
const request = require('superagent');


class UsersStore extends EventEmitter{
	constructor(){
		super();
		this.users = [];
		this.me = [];

		this.userstoadd = [];
	}

	get(){
		return this.users;
	}

	getById(id){
		return this.users.find(u => u.uid === id)
	}
	add(u){
		this.users = this.users.concat(u);
		this.emit("addedUsers");
	}

	setMe(m){
		this.add(m);
		this.me = m;
		this.emit("setMe");
	}

	getMe(){
		return this.me;
	}

	parseCheckLoad(j){
		let uids = this.parseIds(j);
        let check = this.checkUsers(uids);
        if (check.length>0){
            this.loadUsers(check);
        }
        window.userslist = this.users;
	}

	containsUser(id){
		var uf = this.users.find(u => u.uid === id); 
		var r = (typeof uf != "undefined") ? true : false; 
		return  r;
	}

	checkUsers(ids){
  		var res = []
   		ids.map((e) => {
   			if (typeof (this.users.find(u => u.uid === e)) == "undefined" && !this.users.includes(e)){
   				res.push(e);
   			}
   		});
   		return res;
	}

	parseIds(j){
		var res = [];
		j.map((e) => {
			if (!res.includes(e.uid)) 
				res.push(e.uid);
		});
		return res;
	}

	addUsers(u){
		//no update due to offset loading
		this.users = this.users.concat(u);
		//check???
		//this.prevMsgsCount = c;
		this.emit("ADDED_USERS");
	}

	loadUsers(ids){
		request.post('/getusers')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ user_ids: ids})
            .end((err, res) => {
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                 window.res = res;
                 var j = JSON.parse(res.text);
				 this.addUsers(j);
				 j.map((e) => {
				 	this.emit("ADDED_USER",e);
				 })
              }

            }); 
	}

	loadUsersToAdd(){
		if (this.userstoadd.length == 0) return; 
		var v = this.userstoadd.join();
		this.loadUsers(v);
		this.userstoadd = [];
	}

	
	addUserRequest(id){
		if (this.containsUser(id)) return;
		if (this.userstoadd.indexOf(id) == -1)
			this.userstoadd.push(id)

	}

	handleActions(a){
		/*switch(a.type){
			case "":
				break;
			default:
			break;
		}
		return true;*/
	}
}

const usersStore = new UsersStore;
dispatcher.register(usersStore.handleActions.bind(usersStore));
export default usersStore;