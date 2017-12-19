import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router, browserHistory, hashHistory} from 'react-router-dom'

import Header from 'js/ui/components/Header.jsx'


import Login from 'js/ui/pages/Login.jsx'
import Profile from 'js/ui/pages/Profile.jsx'


import Logout from 'js/ui/pages/Logout.jsx'

import ImWrapper from 'js/ui/pages/ImWrapper.jsx'
//import News from 'js/ui/pages/News.jsx'

class MainPage extends Component {
  constructor(props){
  	super(props);
  }

  render() {
    return (
      <div>
        <Header navMenuEnabled={window.isLoginned} />
		<ImWrapper />
        <BrowserRouter>
        {
          (window.isLoginned != 0) ? 
            <div>
              <Route path="/" getComponent={(location, cb) => {
                  System.import('./pages/Login.jsx')
                      .then(module => cb(null, module.Login));
                  }} />
            </div>
          :
          <div>
            <Route path="/" getComponent={(location, cb) => {
                  System.import('./pages/Profile.jsx')
                      .then(module => cb(null, module.Profile));
                  }} />
				  
			<Route path="/im" getComponent={(location, cb) => {
                  System.import('./pages/ImWrapper.jsx')
                      .then(module => cb(null, module.ImWrapper));
                  }} />
			
			<Route path="/" getComponent={(location, cb) => {
                  System.import('./pages/ImWrapper.jsx')
                      .then(module => cb(null, module.ImWrapper));
                  }} />

              {/*<Route path="/id" component={Profile} />
              /*<Route path="/login" component={ImWrapper} />
              <Route path="/news" component={News} />*/}
          </div>
        }
        </BrowserRouter>
		
       {//  <div style={stylebanner}></div>
        }
      </div>
    );
  }
}
export default MainPage;
