import React, { Component } from 'react';

import HeaderLogin from 'js/ui/components/HeaderLogin.jsx'
import AboutContent from 'js/ui/components/about/AboutContent.jsx'

import 'css/pages/about.css'

class About extends Component {

  render() {
     return (
      <div>
		<HeaderLogin />
        <AboutContent />
      </div>
    );
  }
}


export default About;