import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input } from '../../common';
import { connect } from 'react-redux';

import { metricPropertyUpdate } from '.';

class preMetricForm extends Component {

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="Engagement"
              value={this.props.metricName}
              onChangeText={text => this.props.metricPropertyUpdate({ prop: 'metricName', value: text })}
            />
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    metricName: state.metricForm.metricName,
    isDeleted: state.metricForm.isDeleted
  };
};

const MetricForm = connect(mapStateToProps, { metricPropertyUpdate })(preMetricForm);

export { MetricForm };
