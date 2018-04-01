import firebase from 'firebase';
import { CATEGORIES_FETCH_SUCCESS, METRICS_FETCH_SUCCESS, ACTIVITIES_FETCH_SUCCESS, CLEAR_GLOBAL_DATA, CHANGE_DISPLAY_DATE } from '.';


export const fetchCategories = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories`)
      .on('value', snapshot => {
        dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val() });
      }
      );
  }
}

export const changeDisplayDate = (delta) => {
  return {
    type: CHANGE_DISPLAY_DATE,
    payload: delta
  };
}

export const fetchMetrics = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/metrics`)
      .on('value', snapshot => {
        dispatch({ type: METRICS_FETCH_SUCCESS, payload: snapshot.val() });
      }
      );
  }
}

export const fetchActivities = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/activities`).orderByChild('startTime')
      .on('value', snapshot => {
        dispatch({ type: ACTIVITIES_FETCH_SUCCESS, payload: snapshot.val() });
      }
      );
  }
}

export const clearGlobalData = () => {
  return {
    type: CLEAR_GLOBAL_DATA
  }
}
