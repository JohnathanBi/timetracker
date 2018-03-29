import { ACTIVITY_FORM_UPDATE, ACTIVITY_PUSH_SUCCESS } from '.';

const INITIAL_STATE = {
  startTime: (new Date()).getTime(),
  endTime: (new Date()).getTime(),
  categoryUid: null,
  activityMetrics: {}
};




export const ActivityFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVITY_FORM_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case ACTIVITY_PUSH_SUCCESS:
      return INITIAL_STATE;

    default:
      return state;
  }
}
