import React, { Component } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { ActivityForm, createActivity } from '.';
import { CardSection, Button } from '../../common';
import { connect } from 'react-redux'

class preAddActivityScreen extends Component {

  onSaveActivity() {
    const { startTime, endTime, categoryUid, activityMetrics, allActivities } = this.props;

    if (this.startEndTimeFeasible(startTime, endTime)) {
      if (this.noOverLap(startTime, endTime, allActivities)) {
        this.props.createActivity({ startTime, endTime, categoryUid, activityMetrics });
      }
    }

  }

  noOverLap(newStartTime, newEndTime, allActivities) {
    let blockAbove;
    let blockBelow;

    for (let i = 0; i < allActivities.length; i++){
      const { startTime } = allActivities[i];

      if (newStartTime < startTime) {
        if (i !== 0){
          blockAbove = allActivities[i - 1];
        }
        blockBelow = allActivities[i];
        break;
      }

      if (i === allActivities.length - 1) {
        blockAbove = allActivities[i];
      }
    }

    //check if overlaps with block above
    if (blockAbove) {
      const { startTime, endTime } = blockAbove;

      if (endTime > newStartTime) {
        Alert.alert(
          'No Time-Overlap Allowed',
          `There already exists an activity from ${new Date(startTime)} to ${new Date(endTime)}`,
          [
            { text: 'OK', style: 'cancel' },
          ],
          { cancelable: false }
        );

        return false;
      }
    }

    //tests if overlaps with block above
    if (blockBelow) {
      const { startTime, endTime } = blockBelow;

      if (startTime < newEndTime) {
        Alert.alert(
          'No Time-Overlap Allowed',
          `There already exists an activity from ${new Date(startTime)} to ${new Date(endTime)}`,
          [
            { text: 'OK', style: 'cancel' },
          ],
          { cancelable: false }
        );

        return false;
      }
    }

    return true;
  }

  startEndTimeFeasible(startTime, endTime){
    if (startTime >= endTime) {
      Alert.alert(
        'Error',
        'Start time must be earlier than end time',
        [
          { text: 'OK', style: 'cancel' },
        ],
        { cancelable: false }
      );
      return false;
    } else {
      return true;
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
  const { allActivities } = state.global;

  return { startTime, endTime, categoryUid, activityMetrics, allActivities };
}

const AddActivityScreen = connect(mapStateToProps, { createActivity })(preAddActivityScreen);

export { AddActivityScreen };
