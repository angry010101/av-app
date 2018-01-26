import { EventEmitter } from "events"
import dispatcher from "js/backend/Dispatcher.jsx"
const request = require('superagent');


class UsersStore extends EventEmitter{
	constructor(){
		super();
		this.users = [];
		this.me = [];

		this.groups = [];
		
		this.userstoadd = [];
	}

	get(){
		return this.users;
	}

	getById(id){
		return this.users.find(u => u.uid === id)
	}
	
	getGroups(){
		return this.groups;
	}
	
	getGroupById(gid){
		return this.groups.find(g => g.gid === gid)
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

	
	addUserImmediately(id){
		this.addUserRequest(id);
		this.loadUsers(this.userstoadd);
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
	
	addGroups(u){
		this.groups = this.groups.concat(u);
		
		
		this.emit("GROUPS_INFO_ADDED");
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
	
	setOnline(uid,status){
		
		let u = this.getById(uid);
		if (u){
			u.online = status;
			this.emit("USERS_CHANGED","online",uid,status);
		}
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