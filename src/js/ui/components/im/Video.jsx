import React, { Component } from 'react';


class Video extends Component {
	
	constructor(props){
		super();
		this.vid = props.vid;
		
	}
  render() {
    var i = this.props.info;
    return (
      <div class="video_attachment_wrapper">
		Video <br />
		 <span>{ i.title }</span><br />
         <span>{ i.duration }</span><br />
		 <img src={i.image} />
      </div>
    );
  }
}


export default Video;