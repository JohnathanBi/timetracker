import React, { Component } from 'react';
import { View, Text, Picker, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Card, CardSection, Button } from '../../common';
import { connect } from 'react-redux';
import _ from 'lodash';
import { activityFormUpdate } from '.';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

class preActivityForm extends Component {

  state = {
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false
    };

  showStartTimePicker() {
    this.setState({ isStartTimePickerVisible: true });
  }

  hideStartTimePicker() {
     this.setState({ isStartTimePickerVisible: false });
  }

  onStartTimePicked(date) {
     this.props.activityFormUpdate({ prop: 'startTime', value: this.truncateAndFormatMoment(moment(date)) });
     this.hideStartTimePicker();
  }

  showEndTimePicker() {
    this.setState({ isEndTimePickerVisible: true });
  }

  hideEndTimePicker() {
     this.setState({ isEndTimePickerVisible: false });
  }

  onEndTimePicked(date) {
     this.props.activityFormUpdate({ prop: 'endTime', value: this.truncateAndFormatMoment(moment(date)) });
     this.hideEndTimePicker();
  }




  componentWillMount() {
    //this is to prevent overriding old data
    if (!this.props.categoryUid) {
      this.setDefaultCategoryUid();
    }

    //the function here takes care of not overriding old data already
    this.setDefaultMetrics();

    if (this.props.startTime === null || this.props.endTime === null){
      this.setDefaultTime();
    }
  }

  setDefaultCategoryUid() {
    let firstUid = null;
    for(let uid in this.props.activeCategories){
      firstUid = uid;
      break;
    }
    this.props.activityFormUpdate({ prop: 'categoryUid', value: firstUid });
  }

  setDefaultTime() {
    const { dailyActivities } = this.props;

    if (dailyActivities.length === 0) {
      this.props.activityFormUpdate({
        prop: 'startTime',
        value: this.truncateAndFormatMoment(moment().hour(7).minute(0).second(0))
      });

      this.props.activityFormUpdate({
        prop: 'endTime',
        value: this.truncateAndFormatMoment(moment().hour(8).minute(0).second(0))
      });
    } else {
      //find the endTime of the last activity and set it to that
      const newStartTime = moment(dailyActivities[dailyActivities.length - 1].endTime);
      this.props.activityFormUpdate({
        prop: 'startTime',
        value: this.truncateAndFormatMoment(newStartTime)
      });

      const newEndTime = newStartTime.clone().add(1, 'hours');
      this.props.activityFormUpdate({
        prop: 'endTime',
        value: this.truncateAndFormatMoment(newEndTime)
      });
    }
  }

  setDefaultMetrics() {
    let newActivityMetrics = this.props.activityMetrics;

    //this is to resolve a bug, when u don't save any activity Metrics, it becomes undefined
    //So I assigned it a blank object. This is for edge case when someone doesn't assign anything
    //And then creates a metric.
    if (!newActivityMetrics) {
      newActivityMetrics = {};
    }

    for(let uid in this.props.activeMetrics){
      let exists = false;
      for(let existingUid in this.props.activityMetrics){
        if(existingUid === uid){
          exists = true;
        }
      }

      if (!exists) {
        newActivityMetrics = { ...newActivityMetrics, [uid]: 5 };
      }
    }
    this.props.activityFormUpdate({ prop: 'activityMetrics', value: newActivityMetrics });

  }

  getMetricMagnitude(uid){
    console.log("PROBLEM:", this.props.activityMetrics);
    const magnitude = this.props.activityMetrics[uid];
    return `${magnitude}`;
  }

  updateMetric (uid, magnitude) {
    const newActivityMetrics = { ...this.props.activityMetrics, [uid]: magnitude };
    this.props.activityFormUpdate({ prop: 'activityMetrics', value: newActivityMetrics });
  }

  truncateAndFormatMoment(preMoment) {
    const truncatedMoment = preMoment.clone().second(0).millisecond(0);
    return truncatedMoment.format();
  }

  renderPickerCategories() {
      const { activeCategories } = this.props;
      const pickerItemList = _.map(activeCategories,
        (category, uid) => {
          const { categoryName } = category;
          return <Picker.Item label={categoryName} value={uid} key={uid} />;
        }
      );

      return pickerItemList;
  }

  renderMetricPickers(){
      const { activeMetrics } = this.props;

      const metricPickerList = _.map(activeMetrics,
        (metric, uid) => {
          const { metricName } = metric;
          return (
            <CardSection style={{ flexDirection: 'column' }} key={uid}>
              <Text style={styles.pickerTextStyle}>{metricName}</Text>
              <Picker
                selectedValue={this.getMetricMagnitude(uid)}
                onValueChange={magnitude => this.updateMetric(uid, magnitude)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
              </Picker>
            </CardSection>
          );

        }
      );

      return metricPickerList;
  }



  render() {
    return (
      <View>
      <Card>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Pick a Category</Text>
          <Picker
            selectedValue={this.props.categoryUid}
            onValueChange={uid => this.props.activityFormUpdate({ prop: 'categoryUid', value: uid })}
          >
           {this.renderPickerCategories()}
          </Picker>
        </CardSection>

        <CardSection>
          <View style={{ flex: 1 }}>
           <TouchableOpacity onPress={() => this.showStartTimePicker()}>
             <Text>`startTime: ${moment(this.props.startTime).format('LLLL')}`</Text>
           </TouchableOpacity>
           <DateTimePicker
            date={(new Date(this.props.startTime))}
             isVisible={this.state.isStartTimePickerVisible}
             onConfirm={date => this.onStartTimePicked(date)}
             onCancel={() => this.hideStartTimePicker()}
             minuteInterval={5}
             mode={'datetime'}
           />
         </View>
        </CardSection>

        <CardSection>
          <View style={{ flex: 1 }}>
           <TouchableOpacity onPress={() => this.showEndTimePicker()}>
             <Text>`endTime: ${moment(this.props.endTime).format('LLLL')}`</Text>
           </TouchableOpacity>
           <DateTimePicker
            date={(new Date(this.props.endTime))}
             isVisible={this.state.isEndTimePickerVisible}
             onConfirm={date => this.onEndTimePicked(date)}
             onCancel={() => this.hideEndTimePicker()}
             minuteInterval={5}
             mode={'datetime'}
           />
           </View>
        </CardSection>


        {this.renderMetricPickers()}

      </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { startTime, endTime, categoryUid, activityMetrics } = state.activityForm;
  const { activeCategories, activeMetrics, dailyActivities } = state.global;
  return {
    activeCategories,
    activeMetrics,
    startTime,
    endTime,
    categoryUid,
    activityMetrics,
    dailyActivities
  };
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const ActivityForm = connect(mapStateToProps, { activityFormUpdate })(preActivityForm);

export { ActivityForm };
