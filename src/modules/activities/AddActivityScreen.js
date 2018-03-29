import React, { Component } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { ActivityForm, createActivity } from '.';
import { CardSection, Button } from '../../common';
import { connect } from 'react-redux'

class preAddActivityScreen extends Component {

  onSaveActivity() {
    const { startTime, endTime, categoryUid, activityMetrics } = this.props;

    if (startTime >= endTime) {
      Alert.alert(
        'Error',
        'Start time must be earlier than end time',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
        ],
        { cancelable: false }
      );
    } else {
      this.props.createActivity({ startTime, endTime, categoryUid, activityMetrics });
    }



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

const mapStateToProps = state => {
  const { startTime, endTime, categoryUid, activityMetrics } = state.activityForm;

  return { startTime, endTime, categoryUid, activityMetrics };
}

const AddActivityScreen = connect(mapStateToProps, { createActivity })(preAddActivityScreen);

export { AddActivityScreen };
