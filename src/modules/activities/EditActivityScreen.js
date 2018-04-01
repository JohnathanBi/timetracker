import React, { Component } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { ActivityForm, activityFormUpdate, deleteActivity, updateActivity } from '.';
import { CardSection, Button } from '../../common';
import { connect } from 'react-redux';
import moment from 'moment';

class preEditActivityScreen extends Component {

  componentWillMount() {
    let { activityMetrics, categoryUid, startTime, endTime } = this.props.activity;

    //TODO For some reason this causes a problem in activityform, if you initiate a form
    //without having any metrics, and then you add a metric it crashes.
    if (!activityMetrics) {
      activityMetrics = {};
    }

    this.props.activityFormUpdate({ prop: 'startTime', value: startTime });
    this.props.activityFormUpdate({ prop: 'endTime', value: endTime });
    this.props.activityFormUpdate({ prop: 'categoryUid', value: categoryUid });
    this.props.activityFormUpdate({ prop: 'activityMetrics', value: activityMetrics });
  }

  onDeleteActivity() {
    const { uid } = this.props.activity;
    this.props.deleteActivity({ uid });
  }

  onUpdateActivity() {
    const { uid } = this.props.activity;
    const { activityMetrics, categoryUid, startTime, endTime, allActivities } = this.props;

    if (this.startEndTimeFeasible(startTime, endTime)) {
      //we want to delete the element in the list temporarily (not on the server side)
      //so we can run through the original algorithm to see if there will be time overlap
      let updatedActivityList = allActivities.slice();
      let index = -1;
      for (let i = 0; i < allActivities.length; i++) {
        const activityUid = allActivities[i].uid;
        if (uid === activityUid) {
          index = i;
        }
      }

      //can't think of edge case for it being -1 but just in case;
      if (index > -1) {
         updatedActivityList.splice(index, 1);
      }

      if (this.noOverLap(startTime, endTime, updatedActivityList)) {
          this.props.updateActivity({ activityMetrics, categoryUid, startTime, endTime, uid });
      }
    }
  }

  startEndTimeFeasible(startTime, endTime){
    if (!moment(startTime).isBefore(endTime)) {
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


  noOverLap(newStartTime, newEndTime, allActivities) {
    let blockAbove;
    let blockBelow;

    for (let i = 0; i < allActivities.length; i++){
      const { startTime } = allActivities[i];

      if (moment(newStartTime).isBefore(startTime)) {
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

      if (moment(endTime).isAfter(newStartTime)) {
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

      if (moment(startTime).isBefore(newEndTime)) {
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

  render() {
    return (
      <ScrollView>
        <ActivityForm />

        <CardSection>
          <Button onPress={this.onUpdateActivity.bind(this)}>
            Update Category
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onDeleteActivity.bind(this)}>
            Delete Category
          </Button>
        </CardSection>

      </ScrollView>
    );
  }
}



const mapStateToProps = state => {
  const { activityMetrics, categoryUid, startTime, endTime } = state.activityForm;
  return { activityMetrics, categoryUid, startTime, endTime, allActivities: state.global.allActivities };
}

const EditActivityScreen = connect(mapStateToProps, { activityFormUpdate, deleteActivity, updateActivity })(preEditActivityScreen);

export { EditActivityScreen };
