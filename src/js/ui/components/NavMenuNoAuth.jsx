import React, { Component } from 'react';
import 'css/components/nav_menu.css';

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
	 about: "About",
	 login: "Sign in",
	 doc: "Blocking act",
	list_blocked: "Blocked internet resources"
 },
 ua: {
	 about : "Про сайт",
		login: "Увійти",
		doc: "Указ про блокування",
	list_blocked: "Усі заблоковані ресурси"
 },
 ru: {
    about: "Про сайт",
   	login: "Войти",
	doc: "Указ о блокировке",
	list_blocked: "Все заблокированные ресурсы"
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
      <a onClick={this.handleSelect.bind(this)} href="/decree">{strings.doc}</a>
	  
      <a onClick={this.handleSelect.bind(this)} href="/blocked">{strings.list_blocked}</a>
      </div>
    );
  }
}


export default NavMenu;

