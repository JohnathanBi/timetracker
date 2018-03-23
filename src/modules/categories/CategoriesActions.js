import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { CATEGORY_PROPERTY_UPDATE, CATEGORY_PUSH_SUCCESS } from '.';

export const categoryPropertyUpdate = ({ prop, value }) => {
  return {
    type: CATEGORY_PROPERTY_UPDATE,
    payload: { prop, value }
  }
}

export const createCategory = ({ categoryName }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories`)
      .push({ categoryName, isDeleted: false })
        .then(() => {
          dispatch({ type: CATEGORY_PUSH_SUCCESS });
          Actions.pop();
        });
  }
}

export const updateCategory = ({ uid, categoryName, isDeleted }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories/${uid}`)
      .set({ uid, categoryName, isDeleted })
        .then(() => {
          dispatch({ type: CATEGORY_PUSH_SUCCESS });
          Actions.pop();
        });
  }
}
