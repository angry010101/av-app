import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { formatDate } from '/home/angry/av-app/src.jsx/backend/formatDate.jsx'
import PhotoAttachment from '/home/angry/av-app/src.jsx/ui/components/im/PhotoAttachment.jsx' ;
import WallAttachment from '/home/angry/av-app/src.jsx/ui/components/im/WallAttachment.jsx' ;
import AudioMessage from '/home/angry/av-app/src.jsx/ui/components/im/AudioMessage.jsx' ;
import Sticker from '/home/angry/av-app/src.jsx/ui/components/im/Sticker.jsx' ;
import Audio from '/home/angry/av-app/src.jsx/ui/components/im/Audio.jsx' ;

import '/home/angry/av-app/src/css/components/feed/feed_item.css' ;


class FeedItem extends Component {
  constructor(props) {
    super(props);
    
  }

  select(t){
      if (typeof t.attachment == "undefined") return;

      switch(t.attachment.type){
        case "photo":
          
          return <PhotoAttachment info={t.attachment.photo} isbig="0"/>
          
        case "wall":
          return <WallAttachment info={t.attachment.photo}/>
        case "doc":
          return <AudioMessage info={t.attachment.audio} />
        case "sticker":
          return <Sticker info={t.attachment.photo} />
        case "audio":
          return <Audio info={t.attachment.photo} />
        default:
          return "defaultPost"
      }
  }

  componentWillUnMount(){
    
  }

  render() {

    return (
      <div className="feed_item_wrapper">
         <div className="feed_item_content">
            <img className="photo_img" src="" /> 
            <div className="content_div">
              <div className="feed_item_header_wrapper">adad</div>
              <div className="feed_item_main_content_wrapper">
                <div className="feed_item_main_content">
                12345678
                </div>
              </div>
            </div>
         </div>
      </div>
    );
  }
}


export default FeedItem;