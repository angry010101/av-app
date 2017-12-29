import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import routes from './routes.jsx';
import { Router, browserHistory } from 'react-router';


import Login from 'js/ui/pages/Login.jsx'
import Profile from 'js/ui/pages/Profile.jsx'


import Logout from 'js/ui/pages/Logout.jsx'

import ImWrapper from 'js/ui/pages/ImWrapper.jsx'

ReactDOM.render(
  <ImWrapper />,
  document.querySelector('#app')
);
