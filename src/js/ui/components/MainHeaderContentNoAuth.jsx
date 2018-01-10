import React, { Component } from 'react';
import 'css/components/main_header_content.css'
import NavMenuNoAuth from 'js/ui/components/NavMenuNoAuth.jsx'

class MainHeaderContentNoAuth extends Component {
  constructor(){
      super();
    }


  render() {
    return (
      <div className="main_header_content">
      	{
      		<NavMenuNoAuth />
      	}
      </div>    
    );
  }
}

export default MainHeaderContentNoAuth;
