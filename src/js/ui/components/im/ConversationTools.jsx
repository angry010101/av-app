import React, { Component } from 'react';
import dispatcher from "js/backend/Dispatcher.jsx"

class ConversationTools extends Component {
  constructor(props){
  	super(props);
  }

  componentDidMount() {
    dispatcher.register( dispatch => {
      if ( dispatch.type === 'showShadowView' ) {
        
      }
    });
    dispatcher.register( dispatch => {
      if ( dispatch.type === 'hideShadowView' ) {
        
      }
    });
  }  

  render() {
    return (
      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}



export default ConversationTools;
