import React from 'react';
import { Route, IndexRoute } from 'react-router';


import Header from 'js/ui/components/Header.jsx'


import App from 'js/App.jsx';
import Login from 'js/ui/pages/Login.jsx'
import Profile from 'js/ui/pages/Profile.jsx'


import Logout from 'js/ui/pages/Logout.jsx'

import ImWrapper from 'js/ui/pages/ImWrapper.jsx'


export default (
  <Route path='/' component={App}>
    <IndexRoute component={ImWrapper} />
    <Route path='login' component={Login} />
    <Route path='*' component={ImWrapper} />
  </Route>
);