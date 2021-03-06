import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from './routes.jsx';
import { Router, browserHistory } from 'react-router';


ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.querySelector('#app')
);
