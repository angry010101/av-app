import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { formatDate } from 'js/backend/formatDate.jsx'

import 'css/components/im/photo_attachment.css' ;


import HandleShadowViewActions from 'js/backend/HandleShadowViewActions.jsx'
import * as ShadowActions from 'js/backend/ShadowViewActions.jsx'
import Lightbox from 'react-images';

import dispatcher from "js/backend/Dispatcher.jsx"


class PhotoAttachment extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(e){
    e.preventDefault();
    e.stopPropagation();
    dispatcher.dispatch({
      type: 'showShadowView',
      images: this.props.images,
      currentImg: this.props.currentImg
    })

  }

  render() {
    return (
      <div className="attachment_img_wrapper" onClick={(e) => this.handleClick(e)}>
      {
        (this.props.isbig == 1) ? 
        <img className="photo_attachment_img_big" src={this.props.info.src_big} /> :
        <img className="photo_attachment_img" src={this.props.info.src} /> 
      }
      </div>
    );
  }
}


export default PhotoAttachment;