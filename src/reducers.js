import { combineReducers } from 'redux';
import { AuthReducer } from './modules/authentication';
import { CategoryFormReducer } from './modules/categories';
import { GlobalReducer } from './common';

export default combineReducers({
  auth: AuthReducer,
  categoryForm: CategoryFormReducer,
  global: GlobalReducer
});
