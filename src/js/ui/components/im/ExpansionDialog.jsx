import React, { Component } from 'react';
import 'css/components/im/im_expansion_dlg.css';

class ExpansionDialog extends Component {
    constructor(props){
        super(props);
        this.handleClick  = this.handleClick.bind(this);
    }


    handleClick(e,l){
        alert("expansion1: " + l);
    }

    render() {
        return (
            <div>
              <ul>
                <li><a onClick={this.handleClick}>Documents</a></li>
                <li><a onClick={this.handleClick}>Photos</a></li>
                <li><a onClick={this.handleClick}>Videos</a></li>
                {/*<li><a>Voice messages</a></li>*/}
              </ul>
            </div>
    );
  }
}


export default ExpansionDialog;