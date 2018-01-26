import React, { Component } from 'react';
import 'css/components/friends/friends_item.css'

class FriendItem extends Component {
  constructor(props){
  	super(props);
  }
 
  render() {
    return (
	<div className="friend_item_wrapper">
		<div className="friend_item_content">
			<img className="friend_item_profile_photo" />
			another friend
		</div>
    </div>
    );
  }
}


export default FriendItem;
