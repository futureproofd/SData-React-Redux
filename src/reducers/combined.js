import { combineReducers } from 'redux';

import session from './Auth';
import entity from './Entity';

export default combineReducers({
  session,
  entity,
});
