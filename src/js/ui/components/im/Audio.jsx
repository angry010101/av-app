import React, { Component } from 'react';
import 'css/components/nav_menu.css';

import HeaderHandleActions from 'js/backend/HeaderHandleActions.jsx'
import * as HeaderActions from 'js/backend/HeaderActions.jsx'



class Audio extends Component {
  render() {
    var i = this.props.info;
    return (
      <div class="audio_attachment_wrapper">
  	     <span>{ i.title }</span>
         <span>{ i.artist }</span>
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