import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { formatDate } from 'js/backend/formatDate.jsx'
import PhotoAttachment from 'js/ui/components/im/PhotoAttachment.jsx' ;
import WallAttachment from 'js/ui/components/im/WallAttachment.jsx' ;
import AudioMessage from 'js/ui/components/im/AudioMessage.jsx' ;
import Sticker from 'js/ui/components/im/Sticker.jsx' ;
import Audio from 'js/ui/components/im/Audio.jsx' ;
import Video from 'js/ui/components/im/Video.jsx' ;

import DocAttachment from 'js/ui/components/im/DocAttachment.jsx' ;


import 'css/components/im/dialog_attachment.css' ;


class DialogAttachments extends Component {
  constructor(props) {
    super(props);
    this.count = props.info.length;
    this.curr = 0;
    this.allPhotos = true;
    this.images = [];
	this.counter = 0;
  }

  select(t,c){ 
    switch(t.type) {
        case "photo":
		this.counter = this.counter + 1;
          if (this.count == 1){   
            return <PhotoAttachment images={this.images} info={this.props.info[0].photo} isbig="1"/>;
          }
          else {
            return <PhotoAttachment images={this.images} currentImg={this.counter - 1} info={t.photo} isbig="0"/>
          }
        case "wall":
          return <WallAttachment info={t.wall}/>
        case "doc":
          if (t.doc.ext == "ogg"){
            return <AudioMessage info={t.doc} />
          }
          else {
            return <DocAttachment info={t.doc} />
          }
        case "sticker":
          return <Sticker info={t.sticker} />
        case "audio":
          return <Audio info={t.audio} />
		case "video":
			return <Video info={t.video} />
        default:
          return ""
      }
	 
  }

  componentWillMount(){
    this.curr = 0;
    this.props.info.map(e => this.createImageArr(e));
  }

  createImageArr(e){

    if (e.type != "photo") return 
    this.url = "";
    if (typeof e.photo.src_xxbig != "undefined"){
      this.url = e.photo.src_xxbig;
    }
    else {
      if (typeof e.photo.src_xbig != "undefined"){
        this.url = e.photo.src_xbig;
      }
      else {
        if (typeof e.photo.src_big != "undefined"){
          this.url = e.photo.src_big;
        }
      }
    }

    this.images.push({src: this.url});
  }

  componentWillUnMount(){
    this.curr = 0;
  }

          
    bigPic(){
      return <PhotoAttachment images={this.images} info={this.props.info[0].photo} isbig="1"/>
    }


  render() {
    if (this.props.info[0].type == "photo") {
      this.curr=-1; 
    } 
    else {
      this.curr=0;
    }

    this.props.info.map((e) => function(e){ 
      if (e.type!="photo") this.allPhotos = false;
    }); 


    return (
      <div className="attachments_wrapper">
		
        {
          (this.props.info[0].type == "photo" && this.props.info.length == 1) ?
            this.bigPic()
          : ""
        }

        {
          (this.count != 1) ? (
         (!this.allPhotos) ?
          this.props.info.map((e) => this.select(e,this.count)) 
          : <div className="div_photoset">
            { this.props.info.map((e) => this.select(e,this.count)) }
          </div> ) 
          :  (this.props.info[0].type != "photo") ? <div>
            { this.props.info.map((e) => this.select(e,this.count)) }
            </div> : ""
        }    
      </div>
    );
  }
}


export default DialogAttachments;