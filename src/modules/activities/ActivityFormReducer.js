import { ACTIVITY_FORM_UPDATE } from '.';

const INITIAL_STATE = {
  startTime: new Date().toUTCString(),
  endTime: new Date().toUTCString(),
  categoryUid: null,
};

export const ActivityFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVITY_FORM_UPDATE:
      console.log(action)
      console.log({ ...state, [action.payload.prop]: action.payload.value });
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
}
