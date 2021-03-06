import {
  METRIC_PROPERTY_UPDATE,
  METRIC_PUSH_SUCCESS,
  CLEAR_METRIC_FORM_DATA
} from '.';

const INITIAL_STATE = {
  metricName: '',
  isDeleted: false
};

export const MetricFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {


    case METRIC_PROPERTY_UPDATE:
    console.log(action);

      return { ...state, [action.payload.prop]: action.payload.value };
    case METRIC_PUSH_SUCCESS:
      return INITIAL_STATE;

    case CLEAR_METRIC_FORM_DATA:
      return INITIAL_STATE;

    default:
      return state;
  }
}
