import React, { Component } from 'react';
import 'css/components/im/dialog_search_item.css'
import * as MsgActions from 'js/backend/im/MsgActions.jsx'

import UsersStore from 'js/backend/im/UsersStore.jsx'

class SearchDialogItem extends Component {

  constructor(props){
    super(props);
    this.d = this.props.i;
    this.state={
      user: [],
      photo_50: this.d.photo_50
    }
  }
  handleChange(e){
  	e.preventDefault();
  }


 

  componentWillMount(){
    var usr = UsersStore.getById(this.d.uid);
    if (usr){
        this.setState({
          user: usr,
          photo_50: usr.photo_50
        })
    }
    else {
      UsersStore.on("ADDED_USER",(u) =>{
        if (u.uid == this.d.uid)
        this.setState({
           user: u,
            photo_50: u.photo_50
        });
      });
    }
  }

  render() {
    let d = this.props.i;

    switch(d.type){
      case "profile":
        d.title = d.first_name + " "  + d.last_name;
        break;
    }

    var cn = (this.props.selected) ? "dlgsearch_item_div_h selected" : "dlgsearch_item_div_h"; 
    return (
        <div>
          <a className={cn}> 
        
          <div className="dlgsearch_item_div">
            <img className="dlgsearch_img" src={this.state.photo_50} />
            <div className="dlgsearch_text">{ d.title }</div>
          
          </div>
          </a>
        </div>
    );
  }
}

export default SearchDialogItem;