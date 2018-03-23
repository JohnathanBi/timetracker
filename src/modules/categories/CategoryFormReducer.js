import {
  CATEGORY_PROPERTY_UPDATE,
  CATEGORY_PUSH_SUCCESS
} from '.';

const INITIAL_STATE = {
  categoryName: '',
  isDeleted: false
};

export const CategoryFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_PROPERTY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CATEGORY_PUSH_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
