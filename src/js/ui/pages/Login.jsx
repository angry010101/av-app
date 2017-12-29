import React, { Component } from 'react';

import LoginForm  from 'js/ui/components/login/LoginForm.jsx'
import ChangeLog from 'js/ui/components/ChangeLog.jsx'
import Header from 'js/ui/components/Header.jsx'

import 'css/pages/login.css'

class Login extends Component {

  render() {
     return (
      <div>
		<Header />
        <LoginForm />
        <ChangeLog /> 
      </div>
    );
  }
}


export default Login;