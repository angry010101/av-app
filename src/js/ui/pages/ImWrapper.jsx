import React, { Component } from 'react';
import Im from 'js/ui/pages/Im.jsx' 


import Login from 'js/ui/pages/Login.jsx'
import Logout from 'js/ui/pages/Logout.jsx'


import LightboxPictures from 'js/ui/components/LightboxPictures.jsx'
import dispatcher from 'js/backend/dispatcher.jsx'


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
    });
    dispatcher.register( dispatch => {
      if ( dispatch.type === 'hideShadowView' ) {
        this.setState({ SVshow: false, SVimages: "", SVcurrentImg: 0 })
      }
    });
  }  

  render() {
    return (
      <div>
        <LightboxFwdMsgs i={this.state.fwdMsg }/>     
        <LightboxPictures images={this.state.SVimages} currentImg={this.state.SVcurrentImg} show={this.state.SVshow} />
        <Im />
      </div>
    );
  }
}



export default ImWrapper;
