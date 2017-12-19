import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/*\
import '/home/angry/av-app/src/css/pages/login.css'
*/


class ChangeLogItem extends Component {
  
  render() {
     return (
    	<div>
        <div>
          <div>
            <span>
              {this.props.date}
            </span>
          </div>
          <div>
            <span>
              {this.props.text}
            </span>
          </div>
        </div>
      </div>
    );
  }
}


export default ChangeLogItem;