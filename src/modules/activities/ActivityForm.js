import React, { Component } from 'react';
import { View, Text, Picker, DatePickerIOS, ScrollView } from 'react-native';
import { Card, CardSection, Button } from '../../common';
import { connect } from 'react-redux';
import _ from 'lodash';
import { activityFormUpdate } from '.';

class preActivityForm extends Component {
  // state = { showStartTimePicker: false, showEndTimePicker: false };

  localToUTC(localDate){
    return localDate.toUTCString();
  }

  UTCtoLocalDate(UTCDate){
    return new Date(UTCDate);
  }



    renderPickerCategories(){
      const { activeCategories } = this.props;
      const pickerItemList = _.map(activeCategories,
        (category, uid) => {
          const { categoryName } = category;
          return <Picker.Item label={categoryName} value={uid} />;
        }
      );

      return pickerItemList;
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
               date={this.UTCtoLocalDate(this.props.startTime)}
               onDateChange={date => this.props.activityFormUpdate({ prop: 'startTime', value: this.localToUTC(date) })}
               minuteInterval={5}
            />
          </View>
        </CardSection>

        //end time picker
        <CardSection>
          <View style={styles.container}>
            <Text style={styles.pickerTextStyle}>End Time</Text>
            <DatePickerIOS
               date={this.UTCtoLocalDate(this.props.endTime)}
               onDateChange={date => this.props.activityFormUpdate({ prop: 'endTime', value: this.localToUTC(date) })}
               minuteInterval={5}
            />
          </View>
        </CardSection>


        <CardSection>
        </CardSection>


      </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { startTime, endTime, categoryUid } = state.activityForm;

  return {
    activeCategories: state.global.activeCategories,
    startTime,
    endTime,
    categoryUid
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
