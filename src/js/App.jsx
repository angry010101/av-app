import React, { Component } from 'react';
//import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;


/*

<BrowserRouter>
    		<MainPage />
    	</BrowserRouter>
    	*/