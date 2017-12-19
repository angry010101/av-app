import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from "superagent";

class Logout extends Component {
  constructor(props) {
    super(props);

  request
  .post('http://qwertyangry.pythonanywhere.com/logout')
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .end(function(err, res){
    if (err || !res.ok) {
       alert('Oh no! error');
     } else {
       alert('yay got ' + JSON.stringify(res.body));
     }
  });  
  }

  render() {
     return (
    	<div>
        Logout
      		<Logout />
      </div>
    );
  }
}

export default Logout;