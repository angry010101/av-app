import React, { Component } from 'react';

class AudioMessage extends Component {
  constructor(props) {
    super(props);
    this.url = "http://mkv40768.000webhostapp.com/getaudio.php?url=" + this.props.info.url;
  }


  
  render() {
    var i = this.props.info;

    return (
      <div className="">
        { i.title  + " " + i.ext + " " + i.date + " " + i.size}
        <a href={i.url} >Download</a>
      </div>

    );
  }
}

/*

"https://vkuk.000webhostapp.com/getcontent.php?url=" + 

*/

export default AudioMessage;