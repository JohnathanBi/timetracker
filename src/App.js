import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { View, Text } from 'react-native';
import reducers from './Reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

//screens
import Router from './Router';


class App extends Component{

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyC5TJLiIyUDcdd9ol6O2RIQtVgoGIQWDcg',
      authDomain: 'timetracker-f9420.firebaseapp.com',
      databaseURL: 'https://timetracker-f9420.firebaseio.com',
      projectId: 'timetracker-f9420',
      storageBucket: 'timetracker-f9420.appspot.com',
      messagingSenderId: '9633227857'
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    );
  }

}


export default App;
