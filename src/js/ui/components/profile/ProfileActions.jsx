import React, { Component } from 'react';

import '/home/angry/av-app/src/css/components/profile/profile_actions.css'


class ProfileActions extends Component {
  constructor(props){
  	super(props);
  }

  componentDidMount() {
    
  }  


 
  render() {
    return (
      <div className="profile_actions">
         <div className="profile_btn_actions">Actions</div>
         <ul className="profile_actions_list">
            <li>Write</li>
            <li>Read</li>
            <li>Error</li>
         </ul>
      </div>
    );
  }
}


export default ProfileActions;
