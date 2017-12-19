import React, { Component } from 'react';
class AudioMessage extends Component {
  constructor(props) {
    super(props);
    this.url = "http://mkv40768.000webhostapp.com/getaudio.php?url=" + this.props.info.url;
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  render() {
    return (
      <div className="" onClick={this.handleClick}>
        <span>
          Audio Message
        </span>
        <audio controls>
          <source src={this.url} type="audio/mpeg"/>
          <source src={this.url} type="audio/ogg"/>
           <object type="application/x-shockwave-flash" data="https://html5tutorial.info/media/OriginalMusicPlayer.swf" width="225" height="86"> 
             <param name="movie" value="https://html5tutorial.info/media/OriginalMusicPlayer.swf"/>
             <param name="FlashVars" value={"mediaPath=" + this.url}  /> 
           </object> 
           <a href={this.url}>Download this lovely song and wish you all the best!</a>
        </audio>
      </div>

    );
  }
}

/*

"https://vkuk.000webhostapp.com/getcontent.php?url=" + 

*/

export default AudioMessage;