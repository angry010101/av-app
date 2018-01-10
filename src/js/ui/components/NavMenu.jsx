import React, { Component } from 'react';
import 'css/components/nav_menu.css';

import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   conversations:"Conversations",
   logout:"Logout"
 },
 ua: {
   conversations:"Повідомлення",
   logout:"Вийти"
 },
 ru: {
   conversations:"Сообщения",
   logout:"Выйти"
 }
});


class NavMenu extends Component {

  handleSelect(e){
  }


  render() {
    return (
      <div class="nav_menu">
      <a onClick={this.handleSelect.bind(this)} href="/im">{strings.conversations}</a>
	{/*<a onClick={this.handleSelect.bind(this)} href="/news">News</a>*/}
      <a onClick={this.handleSelect.bind(this)} href="/logout">{strings.logout}</a>
      </div>
    );
  }
}


export default NavMenu;

