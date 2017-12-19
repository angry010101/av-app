import React, { Component } from 'react';
import 'css/components/login/login_form.css'

var request = require('superagent');

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.updateLogin = this.updateLogin.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  updateLogin(evt){
    this.setState({login: evt.target.value});   
  }


  updatePassword(evt){
    this.setState({password: evt.target.value});   
  }

  handleSubmit(e) {
    e.preventDefault();
      request
        .post('/auth')
        .send("email=" + this.state.login)
        .send("password=" + this.state.password)
        .end(function(err, res){
                if (err || !res.ok) {
                 alert('Oh no! error');
                } else {
                  if (res.text == "login_success"){
                    window.location.href="/im";
                }
                else {
                 alert(res.text);
                }
            }
        });
  }

  render() {
    return (
    	<div className="login_div">
          <form className="form_login" onSubmit={this.handleSubmit }>
              <span className="label login_label">VK Login</span><br />
              <input onChange={this.updateLogin} className="textinput login_input" type="text" name="email" placeholder="enter input" title="Enter login here" />
              <br />
              <span className="label pass_label">VK Password</span><br />
              <input onChange={this.updatePassword} className="textinput pass_input" type="password" placeholder="enter input" title="Enter phone here" />
              <br />
              <input className="submit_btn" type="submit" name="submit" /><br />
          </form>
     	</div>
    );
  }
}

export default LoginForm;