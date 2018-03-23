import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { METRIC_PROPERTY_UPDATE, METRIC_PUSH_SUCCESS } from '.';

export const metricPropertyUpdate = ({ prop, value }) => {
  return {
    type: METRIC_PROPERTY_UPDATE,
    payload: { prop, value }
  }
}

export const createMetric = ({ metricName }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/metrics`)
      .push({ metricName, isDeleted: false })
        .then(() => {
          dispatch({ type: METRIC_PUSH_SUCCESS });
          Actions.pop();
        });
  }
}

export const updateMetric = ({ uid, metricName, isDeleted }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/metrics/${uid}`)
      .set({ uid, metricName, isDeleted })
        .then(() => {
          dispatch({ type: METRIC_PUSH_SUCCESS });
          Actions.pop();
        });
  }
}
