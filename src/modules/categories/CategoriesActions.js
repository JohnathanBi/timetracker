import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { CATEGORY_UPDATE, CATEGORY_CREATE_SUCCESS, CATEGORIES_FETCH_SUCCESS } from '.';

export const categoryUpdate = ({ prop, value }) => {
  return {
    type: CATEGORY_UPDATE,
    payload: { prop, value }
  }
}

export const createCategory = ({ categoryName }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/categories`)
      .push({ categoryName, isDeleted: false })
        .then(() => {
          dispatch({ type: CATEGORY_CREATE_SUCCESS });
          Actions.pop();
        });
  }
}

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
