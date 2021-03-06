import { USER_SESSION, LOGOUT_SESSION } from '../actions/authSession';

// todo: default state should actually check for a jwt in localstorage
export default function session(
  state = {
    isAuthenticated: false,
  },
  action,
) {
  switch (action.type) {
    case USER_SESSION:
      return {
        sData: action.sData,
        token: action.token,
        isAuthenticated: action.isAuthenticated,
      };
    case LOGOUT_SESSION:
      return {
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}
