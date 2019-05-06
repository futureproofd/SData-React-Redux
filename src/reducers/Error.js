import { CALL_ERROR, AUTH_ERROR, APP_ERROR } from '../actions/errorHandler';

export default function error(
  state = {
    error: null,
  },
  action,
) {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CALL_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case APP_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
