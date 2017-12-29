import React, { Component } from 'react';
import 'css/components/buttons/button_back.css'

import * as MsgActions from 'js/backend/im/MsgActions.jsx'



class ButtonBack extends Component {
  selectDialog(){
      MsgActions.hideBackBtn();
  }


  


  render() {
    return (
        <div onClick={ (e) => this.selectDialog(e) } className="div_back_btn" id="btn_back">
        	<img className="btn_back" src={require("images/backbtn.png")} />
            <span className="btn_back_text">Go back!</span>
        </div> 
    );
  }
}


export default ButtonBack;