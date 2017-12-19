import React, { Component } from 'react';
import '/home/angry/av-app/src/css/components/images/logos/logo.css'
import '/home/angry/av-app/src/css/components/fonts/logo_text.css'


class Logo extends Component {
  render() {
    return (
    	<span>
    		<div className="logo_text" value="AV"></div>
			<img className="logo" />
    	</span>
    );
  }
}

export default Logo;