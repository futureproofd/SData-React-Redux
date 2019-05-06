export const CALL_ERROR = 'CALL_ERROR';
export const AUTH_ERROR = 'AUTH_ERROR';
export const APP_ERROR = 'APP_ERROR';

function authError(type, message) {
  return {
    type: AUTH_ERROR,
    error: { type, message },
  };
}

function callError(type, message) {
  return {
    type: CALL_ERROR,
    error: { type, message },
  };
}

function appError(message) {
  return {
    type: APP_ERROR,
    error: { type: 'APP_ERROR', message },
  };
}

/**
 *
 * @param {string} type type of error (call, message)
 * @param {*} message error code/message
 */
export function handleError(type, message) {
  switch (type) {
    case 'call':
      return (dispatch) => {
        dispatch(callError(type, message));
      };
    case 'auth':
      return (dispatch) => {
        dispatch(authError(type, message));
      };
    default:
      return (dispatch) => {
        dispatch(appError(message));
      };
  }
}
