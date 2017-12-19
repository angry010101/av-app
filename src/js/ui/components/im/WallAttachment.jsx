import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { formatDate } from 'js/backend/formatDate.jsx'
import DialogAttachments from 'js/ui/components/im/DialogAttachments.jsx' ;

import 'css/components/im/wall_attachment.css' ;



function OneElem(props){
    return (
      <div>
         <DialogAttachments info={props.i} />
      </div>
      )
}

class WallAttachment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wall_attachment_wrapper">
        <span className="wall_attachment_title">
        {this.props.info.text}
        </span>
        {
          (typeof this.props.info.attachments != "undefined") ?
            <DialogAttachments info={this.props.info.attachments} /> : ""
        }
        <img src={this.props.info.src} />
      </div>
    );
  }
}


export default WallAttachment;