import React, { Component } from 'react';

import 'css/components/doc.css'
import { formatDate } from 'js/backend/formatDate.jsx'
class AudioMessage extends Component {
  constructor(props) {
    super(props);
    this.url = "http://mkv40768.000webhostapp.com/getaudio.php?url=" + this.props.info.url;
  }


  
  render() {
    var i = this.props.info;

    return (
      <div className="doc_attachment_wrapper">
        <div className="doc_attachment_title">{ i.title } </div>
        <div className="doc_attachment_ext">{ i.ext } </div>
		<div className="doc_attachment_date">{ formatDate(i.date)} </div>
		<div className="doc_attachment_size">{ i.size } "bytes"</div>
        <a className="doc_attachment_link" href={i.url} >Download</a>
      </div>

    );
  }
}

/*

"https://vkuk.000webhostapp.com/getcontent.php?url=" + 

*/

export default AudioMessage;