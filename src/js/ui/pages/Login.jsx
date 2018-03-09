import React, { Component } from 'react';

import LoginForm  from 'js/ui/components/login/LoginForm.jsx'

import LoginContent  from 'js/ui/components/login/LoginContent.jsx'
import HeaderLogin from 'js/ui/components/HeaderLogin.jsx'
import Footer from 'js/ui/components/Footer.jsx'

import 'css/pages/login.css'

class Login extends Component {

  render() {
     return (
      <div>
		<HeaderLogin />
        <LoginForm />
		<LoginContent />
		<Footer />
      </div>
    );
  }
}


export default Login;