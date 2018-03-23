import { combineReducers } from 'redux';
import { AuthReducer } from './modules/authentication';
import { CategoryFormReducer } from './modules/categories';
import { GlobalReducer } from './common';
import { MetricFormReducer } from './modules/metrics';

export default combineReducers({
  auth: AuthReducer,
  categoryForm: CategoryFormReducer,
  metricForm: MetricFormReducer,
  global: GlobalReducer

});
