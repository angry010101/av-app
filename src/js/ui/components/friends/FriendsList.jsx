import React, { Component } from 'react';
import ReactList from 'react-list';

import FriendItem from 'js/ui/components/friends/FriendItem.jsx'


import 'css/components/friends/friends_list.css'

class FriendsList extends Component {

  constructor(props){
  	super(props);
	this.state = {
		accounts: [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
	};
  }

  componentDidMount() {  
  }  

  componentWillMount() {
    //FriendsStore.loadAccounts(::this.handleAccounts);
	//modify
	
	/*
	request.post('/getfriends')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ user_ids: ids})
            .end((err, res) => {
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
				  let j = JSON.parse(res);
                 this.setState({
					 accounts: j
				 });
              }
            }); 
		*/
  }

  handleAccounts(accounts) {
    this.setState({accounts});
  }

  renderItem(index, key){
    return <FriendItem key={key} i={this.state.accounts[index]} />;
  };
 
  render() {
    return (
	<div style={{overflow: 'auto', maxHeight: 400}}>
		  <ReactList
            itemRenderer={(i,k) => { return this.renderItem(i,k) } }
            length={this.state.accounts.length}
            type='uniform'
		/>
    </div>
    );
  }
}


export default FriendsList;
