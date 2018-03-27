import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ACTIVITY_FORM_UPDATE } from '.';

export const activityFormUpdate = ({ prop, value }) => {
  return {
    type: ACTIVITY_FORM_UPDATE,
    payload: { prop, value }
  };
}
