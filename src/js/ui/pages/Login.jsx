import React, { Component } from 'react';

import LoginForm  from 'js/ui/components/login/LoginForm.jsx'
import HeaderLogin from 'js/ui/components/HeaderLogin.jsx'

import 'css/pages/login.css'

class Login extends Component {

  render() {
     return (
      <div>
		<HeaderLogin />
        <LoginForm />
      </div>
    );
  }
}


export default Login;