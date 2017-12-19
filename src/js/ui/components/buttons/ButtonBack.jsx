import React, { Component } from 'react';
import 'css/components/buttons/button_back.css'
import BtnImg from 'images/backbtn.png';

/*
import * as MsgActions from '/home/angry/av-app/src.jsx/backend/im/MsgActions.jsx'
*/


class ButtonBack extends Component {
  selectDialog(){
      MsgActions.hideBackBtn();
  }


  


  render() {
    return (
        <div onClick={ this.selectDialog.bind(this) } className="div_back_btn" id="btn_back">
        	<img className="btn_back" src={BtnImg} />
            <span className="btn_back_text">Go back!</span>
        </div> 
    );
  }
}


export default ButtonBack;