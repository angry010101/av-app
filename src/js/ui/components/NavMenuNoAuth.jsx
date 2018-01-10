import React, { Component } from 'react';
import 'css/components/nav_menu.css';

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
	 about: "About",
	 login: "Sign in"
 },
 ua: {
	 about : "Про сайт",
		login: "Увійти"
 },
 ru: {
   about: "Про сайт",
   		login: "Войти"
 }
});


class NavMenu extends Component {

  handleSelect(e){
  }


  render() {
    return (
      <div class="nav_menu">
	  
      <a onClick={this.handleSelect.bind(this)} href="/login">{strings.login}</a>
      <a onClick={this.handleSelect.bind(this)} href="/about">{strings.about}</a>
      </div>
    );
  }
}


export default NavMenu;

