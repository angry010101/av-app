import React, { Component } from 'react';
import 'css/components/buttons/button_back.css'

import * as MsgActions from 'js/backend/im/MsgActions.jsx'

const btn_url = "/static/images/back_button.png"


import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
	 button_back:"Back"
 },
 ua: {
	button_back:"Повернутися"
 },
 ru: {
   button_back:"Назад"
 }
});

class ButtonBack extends Component {
  selectDialog(){
      MsgActions.hideBackBtn();
  }


  


  render() {
    return (
        <div onClick={ (e) => this.selectDialog(e) } className="div_back_btn" id="btn_back">
        	<img className="btn_back" src={btn_url} />
            <span className="btn_back_text">{strings.button_back}</span>
        </div> 
    );
  }
}


export default ButtonBack;