import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, changeDisplayDate } from '../../common';
import { connect } from 'react-redux';
import moment from 'moment';

class preDateSelector extends Component {

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button onPress={() => this.props.changeDisplayDate('-')}>
          Previous
        </Button>

        <Text>
        {moment(this.props.displayDate).format("MMM Do YY")}
        </Text>

        <Button onPress={() => this.props.changeDisplayDate('+')}>
          Next
        </Button>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return { displayDate: state.global.displayDate };
}

const DateSelector = connect(mapStateToProps, { changeDisplayDate })(preDateSelector);

export { DateSelector };
