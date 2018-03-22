import firebase from 'firebase';
import { CATEGORIES_FETCH_SUCCESS } from '.';


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
