import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ACTIVITY_FORM_UPDATE, ACTIVITY_PUSH_SUCCESS } from '.';

export const activityFormUpdate = ({ prop, value }) => {
  return {
    type: ACTIVITY_FORM_UPDATE,
    payload: { prop, value }
  };
}

export const createActivity = ({ startTime, endTime, categoryUid, activityMetrics }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/activities`)
      .push({ startTime, endTime, categoryUid, activityMetrics  })
        .then(() => {
          dispatch({ type: ACTIVITY_PUSH_SUCCESS });
          Actions.pop();
        });
  }
}

export const deleteActivity = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/activities/${uid}`)
      .remove()
      .then(() => {
          dispatch({ type: ACTIVITY_PUSH_SUCCESS });
          Actions.pop();
      });
  }
}

export const updateActivity = ({ startTime, endTime, categoryUid, activityMetrics, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/activities/${uid}`)
      .set({ startTime, endTime, categoryUid, activityMetrics })
      .then(() => {
        dispatch({ type: ACTIVITY_PUSH_SUCCESS });
        Actions.pop();
      });
  }
}
