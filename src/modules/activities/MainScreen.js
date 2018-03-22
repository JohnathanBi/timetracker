import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from '../common';
import AddActivityScreen from '.'; //TODO
import { Actions } from 'react-native-router-flux';

class MainScreen extends Component {

    onAddActivity() {
      Actions.addActivityScreen();
    }

    onViewCategories() {
      Actions.categoriesScreen();
    }

    onEditMetrics() {
      Actions.editMetricsScreen();
    }

    onLogOut() {
      //TODO might want to clean up state.
      Actions.authentication();
    }

    render() {
    return (
      <View>
        //contains all the actions a user can take
        <Card>
          <CardSection>
            <Button onPress={this.onAddActivity.bind(this)}>
              Add Activity
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onViewCategories.bind(this)}>
              Edit Categories
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onEditMetrics.bind(this)}>
              Edit Metrics
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onLogOut.bind(this)}>
              Log Out
            </Button>
          </CardSection>
        </Card>

        //displays the list of activities tracked for the current day
        <AddActivityScreen />
      </View>
    );
  }
}

export { MainScreen };
