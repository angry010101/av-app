import React, { Component } from 'react';
import 'css/components/feed/video.css';


class Video extends Component {
	
	constructor(props){
		super();
		this.vid = props.vid;
		
	}
  render() {
    var i = this.props.info;
    return (
      <div className="video_attachment_wrapper">
		<div className="video_attachment_label">
			Video
		</div>
		 <div className="video_attachment_headers">
			<div className="video_attachment_title">{ i.title }</div>
			<div className="video_attachment_space"></div>
			<div className="video_attachment_duration">{ i.duration }</div>
		 </div>
		 <img src={i.image} />
      </div>
    );
  }
}


export default Video;