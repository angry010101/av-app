import React, { Component } from 'react';
import dispatcher from "/home/angry/av-app/src.jsx/backend/Dispatcher.jsx"


import "/home/angry/av-app/src/css/components/feed/feed_list.css"

import FeedItem from '/home/angry/av-app/src.jsx/ui/components/feed/FeedItem.jsx' ;

class FeedList extends Component {
  constructor(props){
  	super(props);
  }

  componentDidMount() {
  }  


  getList(){
    const e = [1,2,3,4,5];
    const listitems = e.map((z,i) => <FeedItem />);

    return listitems;
  }

  render() {
    return (
      <ul className="feed_list_wrapper">
          {
            this.getList()
          }
      </ul>
    );
  }
}


export default FeedList;