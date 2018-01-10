import React, { Component } from 'react';
import ButtonBack from 'js/ui/components/buttons/ButtonBack.jsx'
import 'css/components/main_header_content.css'

import NavMenu from 'js/ui/components/NavMenu.jsx'

import dispatcher from "js/backend/Dispatcher.jsx"


class MainHeaderContent extends Component {
  constructor(){
      super();
      this.state=({
        show: false
      });
    }

    componentDidMount(){
      dispatcher.register( dispatch => {
        if ( dispatch.type === 'SHOW_BACK_BTN' ) {
          this.setState({ show: true })
        }
      });

      dispatcher.register( dispatch => {
        if ( dispatch.type === 'HIDE_BACK_BTN' ) {
          this.setState({ show: false })
        }
      });
    }
	
	



  render() {
    return (
      <div className="main_header_content">
      	{ (this.state.show) 
      		? <ButtonBack/> 
      		: "" }

      	{
      		<NavMenu />
      	}
      </div>    
    );
  }
}

export default MainHeaderContent;
