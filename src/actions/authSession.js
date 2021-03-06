/* eslint-disable no-undef */
import { SDataService } from '../utils/API';

import { endPoint } from '../config/config';
import { handleError } from './errorHandler';

export const USER_SESSION = 'USER_SESSION';
export const LOGOUT_SESSION = 'LOGOUT_SESSION';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function userSession(sData, token) {
  return {
    type: USER_SESSION,
    sData,
    token,
    isAuthenticated: true,
    sessionError: { isError: false },
  };
}

function logoutSession() {
  return {
    type: LOGOUT_SESSION,
    isAuthenticated: false,
  };
}

/* action creators */

// Handles initial login
export function handleLogin(username, pw) {
  // return a function, use middleware thunk
  return (dispatch) => {
    const token = btoa(`${username}:${pw}`);
    const sData = SDataService(endPoint);

    sData.setAuthenticationParameters(username, pw).then((res) => {
      if (res.err) {
        dispatch(handleError('app', res.err.response.status));
      } else {
        // stores our 'token' for refreshing session
        localStorage.setItem('token', token);
        dispatch(userSession(sData, token));
      }
    });
  };
}

// Handles browser refresh (checks localStorage for fake token)
export function reAuthenticate(token) {
  return (dispatch) => {
    const creds = atob(token);
    const username = creds.substring(0, creds.indexOf(':'));
    const password = creds.substring(creds.indexOf(':') + 1, creds.length);
    const sData = SDataService(endPoint, username, password);
    dispatch(userSession(sData, token));
  };
}

export function handleLogout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logoutSession());
  };
}
