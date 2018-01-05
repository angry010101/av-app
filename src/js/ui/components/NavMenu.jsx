import React, { Component } from 'react';
import 'css/components/nav_menu.css';


/*
import HeaderHandleActions from '/home/angry/av-app/src.jsx/backend/HeaderHandleActions.jsxx'
import * as HeaderActions from '/home/angry/av-app/src.jsx/backend/HeaderActions.jsxx'
import { Link } from 'react-router';
*/

class NavMenu extends Component {

  handleSelect(e){
  }


  render() {
    return (
      <div class="nav_menu">
  	{/*	<a onClick={this.handleSelect.bind(this)} href="#news">News</a>
		  <a onClick={this.handleSelect.bind(this)} href="#home">Messages</a>
  		<a onClick={this.handleSelect.bind(this)} href="#contact">Contact</a>
  		<a onClick={this.handleSelect.bind(this)} href="#about">About</a>
  		<a onClick={this.handleSelect.bind(this)} href="/logout">Logout</a>
    */}
      <a onClick={this.handleSelect.bind(this)} href="/im">Conversations</a>
	{/*<a onClick={this.handleSelect.bind(this)} href="/news">News</a>*/}
      <a onClick={this.handleSelect.bind(this)} href="/logout">Logout</a>
      </div>
    );
  }
}


export default NavMenu;

