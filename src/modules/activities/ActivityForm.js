import React, { Component } from 'react';
import { View, Text, Picker, DatePickerIOS, ScrollView } from 'react-native';
import { Card, CardSection, Button } from '../../common';
import { connect } from 'react-redux';
import _ from 'lodash';
import { activityFormUpdate } from '.';

class preActivityForm extends Component {
  // state = { showStartTimePicker: false, showEndTimePicker: false };

  componentWillMount() {
    if (this.props.categoryUid === null) {
      this.setDefaultCategoryUid();
    }
    this.setDefaultMetrics();
  }

  setDefaultMetrics() {
    let newActivityMetrics = this.props.activityMetrics;

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
    const magnitude = this.props.activityMetrics[uid];
    return `${magnitude}`;
  }

  updateMetric(uid, magnitude){
    const newActivityMetrics = { ...this.props.activityMetrics, [uid]: magnitude };
    this.props.activityFormUpdate({ prop: 'activityMetrics', value: newActivityMetrics });
  }

  setDefaultCategoryUid() {
    let firstUid = null;
    for(let uid in this.props.activeCategories){
      firstUid = uid;
      break;
    }
    this.props.activityFormUpdate({ prop: 'categoryUid', value: firstUid });
  }

  localDateToTruncatedTime(localDate){
      localDate.setSeconds(0);
      localDate.setMilliseconds(0);

      return (new Date(localDate)).getTime();
  }

  timeToLocalDate(time){
    return new Date(time);
  }



    renderPickerCategories(){
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


        //start time picker
        <CardSection>
          <View style={styles.container}>
            <Text style={styles.pickerTextStyle}>Start Time</Text>
            <DatePickerIOS
               date={this.timeToLocalDate(this.props.startTime)}
               onDateChange={date => this.props.activityFormUpdate({ prop: 'startTime', value: this.localDateToTruncatedTime(date) })}
               minuteInterval={5}
            />
          </View>
        </CardSection>

        //end time picker
        <CardSection>
          <View style={styles.container}>
            <Text style={styles.pickerTextStyle}>End Time</Text>
            <DatePickerIOS
               date={this.timeToLocalDate(this.props.endTime)}
               onDateChange={date => this.props.activityFormUpdate({ prop: 'endTime', value: this.localDateToTruncatedTime(date) })}
               minuteInterval={5}
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
  const { activeCategories, activeMetrics } = state.global;
  return {
    activeCategories,
    activeMetrics,
    startTime,
    endTime,
    categoryUid,
    activityMetrics
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
