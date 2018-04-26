import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { DailyActivitiesList } from '.';




class ActivitiesScreen extends Component {

    render() {
      return (
        <ScrollView>
          <DailyActivitiesList />
        </ScrollView>
      );
    }
}

export { ActivitiesScreen };
