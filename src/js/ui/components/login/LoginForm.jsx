import React, { Component } from 'react';
import 'css/components/login/login_form.css'

var request = require('superagent');




import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   vk_login: "VK Login",
   vk_password: "VK Password",
   login_placeholder: "",
   login_title: "Login must be here",
   password_title: "Password must be here",
   error: "Incorrent login or password",
   send: "Sign in"
 },
 ua: {
   vk_login: "ВК Логін",
   vk_password: "ВК пароль",
   login_placeholder: "",
   login_title: "Логін або номер телефону",
   password_title: "Пароль",
   error: "Неправильний логін або пароль",
   send: "Увійти"
 },
 ru: {
   vk_login: "ВК Логин",
   vk_password: "ВК Пароль",
   login_placeholder: "",
   login_title: "Введите логин",
   password_title: "Пароль",
   error: "Неправильный логин или пароль",
   send: "Войти"
 }
});

const imgLoading = "/static/images/circle-loading.gif"

const styleLoading = {
	"width": "48px",
	"height": "48px"
}


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
	  isLoginning: false,
	  showError: false
    };
    
  }

  updateLogin(evt){
    this.setState({login: evt.target.value});   
  }


  updatePassword(evt){
    this.setState({password: evt.target.value});   
  }

  handleSubmit(e) {
    e.preventDefault();
	if (this.state.login == "" || this.state.password == "") {
		alert("Incorrent values");
		return;
	}
	e.disabled = true;
	if (!this.validateNumber(this.state.login)){
		if (!this.validateEmail(this.state.login)){
			alert("Incorrent login")
			return;
		} 
	}
	
	this.setState({
		isLoginning: true,
		showError: false
	}, () => { this.req(e) });

	}

	req(e){
		document.getElementById("sbm").disabled = true
      request
        .post('/auth')
        .send("email=" + this.state.login)
        .send("password=" + this.state.password)
        .end((err, res) => {
				document.getElementById("sbm").disabled = false
                if (err || !res.ok) {
                 alert('An error happened. Please, try again later');
                } 
				else {
                  if (res.text == "login_success"){
                    window.location.href="/im";
                }
                else {
					if (res.text == "error"){
						this.setState({
							showError: true
						})
					}
                }
				this.setState({
					isLoginning: false
				});
				e.disabled = false;
            }
        });
	}
	
	validateNumber(num){
		var myPhoneRegex = /^[0-9\-\+]{9,15}$/;
		return myPhoneRegex.test(num)
	}
	
	validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email.toLowerCase());
	}

	errLabel(b){
		this.setState({ showError: b});
	}
	
  render() {
    return (
    	<div className="login_div">
          <form className="form_login" onSubmit={(e) => this.handleSubmit(e) }>
			  {(this.state.showError) ? <span className="label error_label">{strings.error}</span> : ""}
			  { (this.state.showError) ? <div><br /></div> : "" }
              <span className="label login_label">{strings.vk_login}</span><br />
              <input onChange={(e) => this.updateLogin(e)} className="textinput login_input" type="text" name="email" placeholder={strings.login_placeholder} title={strings.login_title} />
              <br />
              <span className="label pass_label">{strings.vk_password}</span><br />
              <input onChange={(e) => this.updatePassword(e)} className="textinput pass_input" type="password" title={strings.password_title} />
              <br />
              <input className="submit_btn" type="submit" id="sbm" name="submit" value={strings.send} /><br /><br />
			  { (this.state.isLoginning) ? <img style={styleLoading} src={imgLoading} /> : "" } 
          </form>
     	</div>
    );
  }
}

export default LoginForm;