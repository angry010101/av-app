import React, { Component } from 'react';
import 'css/components/audio.css';

import HeaderHandleActions from 'js/backend/HeaderHandleActions.jsx'
import * as HeaderActions from 'js/backend/HeaderActions.jsx'



class Audio extends Component {
  render() {
    var i = this.props.info;
    return (
      <div className="audio_attachment_wrapper">
         <div className="audio_attachment_headers">
			<div className="audio_attachment_artist">{ i.artist }</div>
			<div className="audio_attachment_title">{ i.title }</div>
		 </div>
         <audio controls>
          <source src={i.url} type="audio/mpeg"/>
          <source src={i.url} type="audio/ogg"/>
           <object type="application/x-shockwave-flash" data="https://html5tutorial.info/media/OriginalMusicPlayer.swf" width="225" height="86"> 
             <param name="movie" value="https://html5tutorial.info/media/OriginalMusicPlayer.swf"/>
             <param name="FlashVars" value={"mediaPath=" + i.url}  /> 
           </object> 
           <a href={i.url}>Download this lovely song and wish you all the best!</a>
        </audio>
      </div>
    );
  }
}


export default Audio;