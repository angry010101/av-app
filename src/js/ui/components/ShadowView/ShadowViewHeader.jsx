import React, { Component } from 'react';

import 'css/components/shadowview/shadow_view_header.css';



import HandleShadowViewActions from 'js/backend/HandleShadowViewActions.jsx'
import * as ShadowActions from 'js/backend/ShadowViewActions.jsx'


class ShadowViewHeader extends Component {
    constructor(){
        super();
    }

    handleClose(e){
    	/*ShadowActions.hideShadowView();*/
        this.props.close();
    }

    render() {
        return (
            <div className="shadow_view_header">
                <a className="shadow_title">
                	Lorem is isput taadadam...
                </a>
                <a className="shadow_closeBtn" onClick={this.handleClose}>
                	X
                </a>
            </div>
    );
  }
}


export default ShadowViewHeader;
