import firebase from 'firebase';
import { CATEGORIES_FETCH_SUCCESS, METRICS_FETCH_SUCCESS, ACTIVITIES_FETCH_SUCCESS } from '.';


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
