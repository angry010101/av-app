import React, { Component } from 'react';
import Im from '/home/angry/av-app/src.jsx/ui/pages/Im.jsx' ;
import Login from '/home/angry/av-app/src.jsx/ui/pages/Login.jsx'
import Logout from '/home/angry/av-app/src.jsx/ui/pages/Logout.jsx'
//import ShadowView from '/home/angry/av-app/src.jsx/ui/components/ShadowView.jsx'
import dispatcher from "/home/angry/av-app/src.jsx/backend/Dispatcher.jsx"
import Lightbox from 'react-images';
import NewsStore from '/home/angry/av-app/src.jsx/backend/news/NewsStore.jsx'
//import NewsItem from '/home/angry/av-app/src.jsx/ui/components/news/NewsItem.jsx' ;


const request = require('superagent');

var startedLoadingMoreNews = false;

class News extends Component {
  constructor(props){
  	super(props);
  	this.state=({
      feed: NewsStore.getFeed()
  	});

    window.newsOffset = 0;
  }


  startNewsLoading(){
    if (startedLoadingMoreNews) return;
   /* request.post('/getnews')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ offset: window.newsOffset})
            .end(function(err, res){
              if (err || !res.ok) {
                 alert('Oh no! error');
              } else {
                 window.res = res;
                 var j = JSON.parse(res.text);

                 NewsStore.parse(j);
                 startedLoadingMoreNews = false;
                 window.newsOffset += 20;
              }
            }); */
  }

  componentWillMount(){
        this.startNewsLoading();  
        NewsStore.on("addedFeed",() =>{
          this.setState({ feed: NewsStore.getFeed() })
        });
  }

  ListItem(d) {
  return (<div>
         {/*  <NewsItem d={d} /> */}
      </div>)
  }
  
  componentDidMount() {
    dispatcher.register( dispatch => {
      if ( dispatch.type === 'addFeed' ) {
        
      }
    });

  }  

  getNews(){
    var p = NewsStore.getProfiles();
    var g = NewsStore.getGroups();
    var f = this.state.feed;

    const list = f.map((e) => this.ListItem(e));
    
    return (<div>
        { list }
      </div>);
  }
 
  render() {
    return (
      <div>
        { this.getNews() }
      </div>
    );
  }
}

export default News;
