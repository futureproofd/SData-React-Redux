/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import Login from './Login';
import Logout from './Logout';
import { handleLogin, handleLogout } from '../actions/authSession';

const NavTop = (props) => {
  const { dispatch, isAuthenticated } = props;
  return (
    <header>
      <a className="navbar-brand" href="#">
        SLX CRM
      </a>
      <div>
        {isAuthenticated ? (
          <Logout logoutClick={() => dispatch(handleLogout())} />
        ) : (
          <Login loginClick={(user, pw) => dispatch(handleLogin(user, pw))} />
        )}
      </div>
    </header>
  );
};

export default NavTop;
