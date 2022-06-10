import React, { useEffect } from 'react';
import Cookie from "js-cookie";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import { ProtectedRoute } from '../components/utilities/protectedRoute';

import SignIn from '../pages/SignIn';
import Instances from '../pages/instances';
import { Contacts } from '../pages/contacts';

export function Routes() {
  const location = useLocation();
  const history = useHistory();

  const token = Cookie.get("whats-front-token");

  useEffect(() => {
    if (location.pathname === '/' && token) {
      history.push('/admin/contacts');
    }
  }, [history, token, location.pathname]);

  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      
      <ProtectedRoute path="/admin/contacts" component={Contacts} />
      <ProtectedRoute path="/admin/instances"  component={Instances} />
    </Switch>
  );
}