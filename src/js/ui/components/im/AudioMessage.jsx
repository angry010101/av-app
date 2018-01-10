import React, { Component } from 'react';

import 'css/components/im/audio_message.css'
import LocalizedStrings from 'react-localization';
 
let strings = new LocalizedStrings({
 en:{
   audio_message:"Audio Message",
   download: "Download this lovely song and wish you all the best!"
 },
 ua: {
   audio_message:"Аудіо повідомлення",
   download: "Завантажити"
 },
 ru: {
   audio_message:"Аудио сообщение",
   download: "Скачать"
 }
});

class AudioMessage extends Component {
  constructor(props) {
    super(props);
    this.url = "http://mkv40768.000webhostapp.com/getaudio.php?url=" + this.props.info.url;
  }


  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  render() {
    return (
      <div className="audio_message_wrapper" onClick={(e) => this.handleClick(e)}>
        <span>
          {strings.audio_message}
        </span><br />
        <audio controls>
          <source src={this.url} type="audio/mpeg"/>
          <source src={this.url} type="audio/ogg"/>
           <object type="application/x-shockwave-flash" data="https://html5tutorial.info/media/OriginalMusicPlayer.swf" width="225" height="86"> 
             <param name="movie" value="https://html5tutorial.info/media/OriginalMusicPlayer.swf"/>
             <param name="FlashVars" value={"mediaPath=" + this.url}  /> 
           </object> 
           <a href={this.url}>{ strings.download} </a>
        </audio>
      </div>

    );
  }
}

/*

"https://vkuk.000webhostapp.com/getcontent.php?url=" + 

*/

export default AudioMessage;