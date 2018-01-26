import React, { Component } from 'react';
import Header from 'js/ui/components/Header.jsx'


import FriendsList from 'js/ui/components/friends/FriendsList.jsx'



import 'css/pages/friends.css'

class FriendsPage extends Component {
  constructor(props){
  	super(props);
  }

  componentDidMount() {
    
  }  


 
  render() {
    return (
	<div>
		<div>
		  <Header style={{"position": "fixed"}} />		
		</div>
      <div className="friends_main_wrapper">
		<div className="friends_main_content">
			<div className="friends_count_label_wrapper">
				<span className="friends_count_label">You have -21313656324234r frands</span>
				<input />
			</div>
			<FriendsList />
		</div>
      </div>
	</div>
    );
  }
}


export default FriendsPage;
