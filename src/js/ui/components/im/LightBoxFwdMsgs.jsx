import React, { Component } from 'react';

import 'css/components/shadow_view.css';

import ShadowViewHeader from 'js/ui/components/ShadowView/ShadowViewHeader.jsx'
import ShadowViewFooter from 'js/ui/components/ShadowView/ShadowViewFooter.jsx'



import HandleShadowViewActions from 'js/backend/HandleShadowViewActions.jsx'
import * as ShadowActions from 'js/backend/ShadowViewActions.jsx'

import dispatcher from "js/backend/Dispatcher.jsx"

import ForwardedMessage from 'js/ui/components/im/ForwardedMessage.jsx' ;


class LightboxFwdMsgs extends Component {
    constructor(props){
        super(props);
        this.state=({
            msgs: [],
            show: false,
            users: []
        });
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e){
        this.setState({
            show: false,
            msgs: [],
            users: []
        })
    }

    componentDidMount(){
        dispatcher.register( dispatch => {
            if ( dispatch.type === 'SHOW_SHADOW_VIEW_FWD' ) {
                this.setState({
                    show: true,
                    msgs: dispatch.msgs,
                    users: dispatch.users
            });
            }
        });
    }
    
    handleMsgs(e){
        return <ForwardedMessage msg={e} users={this.state.users} recursive="1"/>
    }

    render() {
        if (!this.state.show) return "";
        return (
            <div className="shadow_view_wrapper" id="shadow_view_wrapper">
                <div className="shadow" onClick={this.handleClose}>
                    </div>
                <div className="shadow_view_main">
                    <ShadowViewHeader close={this.handleClose} />
                    <div className="shadow_view_content">
                        {
                            this.state.msgs.map((e) => this.handleMsgs(e))
                        }
                    </div>
                    {/*<ShadowViewFooter />*/}
                </div>
            </div>  
    );
  }
}

export default LightboxFwdMsgs;
