import {
  CATEGORY_UPDATE,
  CATEGORY_CREATE_SUCCESS
} from '.'

const INITIAL_STATE = {
  categoryName: '',
  isDeleted: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CATEGORY_CREATE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
