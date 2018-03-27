import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { ActivityForm } from '.';
import { CardSection, Button } from '../../common';

class AddActivityScreen extends Component {

  onSaveActivity() {

  }

  render() {
    return (
      <ScrollView>
        <ActivityForm />

        <CardSection>
          <Button onPress={this.onSaveActivity.bind(this)}>
            Save
          </Button>
        </CardSection>
      </ScrollView>
    );
  }
}

export { AddActivityScreen };
