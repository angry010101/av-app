import React, { Component } from 'react';

import dispatcher from "js/backend/Dispatcher.jsx"
//import 'css/pages'

/*
import ProfileActions from '/home/angry/av-app/src.jsx/ui/components/profile/ProfileActions.jsx' ;

import FeedList from '/home/angry/av-app/src.jsx/ui/components/feed/FeedList.jsx' ;
*/

class Profile extends Component {
  constructor(props){
  	super(props);
  }

  componentDidMount() {
    
  }  


 
  render() {
    return (
      <div>
        <div className="content_container profile_first_content">
          <div className="profile_big_img_div">
              <img src="" className="profile_big_img"/>  
          </div>
          
          <div className="profile_user_info_div">
              <span className="profile_title_name">FirstName LastNameovich</span>
              <div className="profile_status_div">
                <span className="profile_status_label">Today is a good day</span>
              </div>
              <div className="profile_activity_div">
                <span className="profile_activity_label">Last seen 16:42</span>
              </div>

              <div className="profile_additional_info_div">
                <ul className="profile_additional_info_ul">
                  <li>city: new city()</li>
                  <li>town: new city()</li>
                  <li>phone: new city()</li>
                  <li>email: new city()</li>
                  <li>asdadadad: new city()</li>
                </ul>
              </div>
          </div>
        </div>
        <div className="content_container">
          <ProfileActions />
          <FeedList />
        </div> 
      </div>
    );
  }
}


export default Profile;
