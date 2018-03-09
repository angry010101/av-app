import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { formatDate } from 'js/backend/formatDate.jsx'

import 'css/components/im/photo_attachment.css' ;


import HandleShadowViewActions from 'js/backend/HandleShadowViewActions.jsx'
import * as ShadowActions from 'js/backend/ShadowViewActions.jsx'
import Lightbox from 'react-images';

import dispatcher from "js/backend/Dispatcher.jsx"

import { replace_url } from  'js/backend/ReplaceUrl.jsx'
import MessagesStore from 'js/backend/im/MessagesStore.jsx'
class PhotoAttachment extends Component {
  constructor(props) {
    super(props);
	
  }

  
  componentDidMount(){
	
  }
  
  handleClick(e){
    e.preventDefault();
    e.stopPropagation();
	
	
	if (this.props.isbig == 1){
		let element = this.props.info[0].photo ;

		
		element.srcSet = []
		if (element.src_small) element.srcSet.push(replace_url + element.src_small + " 320w") 
		if (element.src_big) element.srcSet.push(replace_url + element.src_big + " 500w")
		if (element.src_xbig) element.srcSet.push(replace_url + element.src_xbig + " 800w")
		if (element.src_xxbig) element.srcSet.push(replace_url + element.src_xxbig + " 1024w")
		
		 dispatcher.dispatch({
			type: 'showShadowView',
			images: [element],
			currentImg: 0
			})
		
		return ;
	}
	let arr = [];
	let imgs = this.props.images;
	if (imgs.length == 0){
		imgs = MessagesStore.getAttachments();
	}
	for (var i = 0; i< imgs.length; i++){
		let element = imgs[i].photo ;

		
		element.srcSet = []
		if (element.src_small) element.srcSet.push(replace_url + element.src_small + " 320w") 
		if (element.src_big) element.srcSet.push(replace_url + element.src_big + " 500w")
		if (element.src_xbig) element.srcSet.push(replace_url + element.src_xbig + " 800w")
		if (element.src_xxbig) element.srcSet.push(replace_url + element.src_xxbig + " 1024w")
		
		arr.push(element);
	
	}
    dispatcher.dispatch({
      type: 'showShadowView',
      images: arr,
      currentImg: this.props.currentImg
    })

  }

  render() {
    return (
      <div className="attachment_img_wrapper" onClick={(e) => this.handleClick(e)}>
      {
        (this.props.isbig == 1) ? 
        <img className="photo_attachment_img_big" src={replace_url + this.props.info[0].photo.src_big} /> :
        <img className="photo_attachment_img" src={replace_url + this.props.info.src} /> 
      }
      </div>
    );
  }
}


export default PhotoAttachment;