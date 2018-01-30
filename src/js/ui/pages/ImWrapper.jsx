import React, { Component } from 'react';
import Im from 'js/ui/pages/Im.jsx' 
import Header from 'js/ui/components/Header.jsx'


//import * as photoErrorDetectStart from 'js/backend/PhotoErrorHandling.jsx';


import { browserHistory } from 'react-router';
import Login from 'js/ui/pages/Login.jsx'
import Logout from 'js/ui/pages/Logout.jsx'
import { startLoadingPreviewMessages } from 'js/backend/im/LoadPreviewMessages.jsx'
import * as LPHClient from 'js/backend/im/LongPollHistoryClient.jsx'
import * as LPClient from 'js/backend/im/LongPollClient.jsx'

import LightboxPictures from 'js/ui/components/LightBoxPictures.jsx'
import dispatcher from 'js/backend/Dispatcher.jsx'


import LightboxFwdMsgs from 'js/ui/components/im/LightboxFwdMsgs.jsx'

/*
import Lightbox from 'react-images';
*/
class ImWrapper extends Component {
  constructor(props){
  	super(props);
  	this.state=({
		SVshow: false,
		SVimages: [],
		SVcurrentImg: 0,
		fwdMsg: []
  	});
	
  }

  componentDidMount() {
    dispatcher.register( dispatch => {
      if ( dispatch.type === 'showShadowView' ) {
        this.setState({ 
        	SVshow: true,
         	SVimages: dispatch.images,
         	SVcurrentImg: dispatch.currentImg
         })
      }
	  if ( dispatch.type === 'hideShadowView' ) {
        this.setState({ SVshow: false, SVimages: [], SVcurrentImg: 0 })
      }
    });
  }  
 

	chImg(c){
		let cimg = c;
			this.setState({
				SVcurrentImg: cimg
			})
	}
	
  render() {
    return (
      <div>
		<Header />
        <LightboxFwdMsgs i={this.state.fwdMsg }/>     
        <LightboxPictures images={this.state.SVimages} currentImg={this.state.SVcurrentImg} show={this.state.SVshow} 
		changeImage={(e) => this.chImg(e)}/>
        <Im />
      </div>
    );
  }
}



export default ImWrapper;
