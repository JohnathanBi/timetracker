import { combineReducers } from 'redux';
import AuthReducer from './modules/authentication/AuthReducer';
import CategoriesReducer from './modules/categories/CategoriesReducer';
import CategoryFormReducer from './modules/categories/CategoryFormReducer';

export default combineReducers({
  auth: AuthReducer,
  categoryForm: CategoryFormReducer,
  categories: CategoriesReducer
});
