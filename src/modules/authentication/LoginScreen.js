import React, { Component } from 'react';
import { LoginForm } from '.';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class LoginScreen extends Component {

  state = {
    isLoading: true
  }

  componentDidMount(){
    //this is for authentication persistence, such that users will be signed in.
    this.authSubscription =
    firebase.auth().onAuthStateChanged((user) => {
        this.setState({
          isLoading: false,
          user
        });
      });
  }

  componentWillUnmount() {
    this.authSubscription();
    console.log('unmounted');
  }

  render() {

    if (this.state.isLoading) {
      return null;
    } else if (this.state.user) {
      Actions.main();
      return null;
    } else {
      return <LoginForm />;
    }

  }
}

export { LoginScreen };
