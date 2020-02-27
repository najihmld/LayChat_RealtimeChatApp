import { combineReducers } from 'redux';

import auth from '../../Auth/reducer';
import user from '../../App/Account/reducer';

export default combineReducers({
  auth,
  user
});
