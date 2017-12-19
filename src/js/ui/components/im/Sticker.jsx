import React, { Component } from 'react';


class Sticker extends Component {
  render() {
    return (
      <div class="sticker_wrapper">
  	     <img src={"http://mkv40768.000webhostapp.com/?url=" + this.props.info.photo_128} />
      </div>
    );
  }
}


export default Sticker;