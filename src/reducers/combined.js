import { combineReducers } from 'redux';

import session from './Auth';
import entity from './Entity';
import error from './Error';

export default combineReducers({
  session,
  entity,
  error,
});
