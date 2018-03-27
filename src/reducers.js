import { combineReducers } from 'redux';
import { AuthReducer } from './modules/authentication';
import { CategoryFormReducer } from './modules/categories';
import { GlobalReducer } from './common';
import { MetricFormReducer } from './modules/metrics';
import { ActivityFormReducer } from './modules/activities';

export default combineReducers({
  auth: AuthReducer,
  categoryForm: CategoryFormReducer,
  metricForm: MetricFormReducer,
  global: GlobalReducer,
  activityForm: ActivityFormReducer
});
