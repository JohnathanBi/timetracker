import React, { Component } from 'react';
import { View } from 'react-native';
import { MetricForm, createMetric } from '.';
import { connect } from 'react-redux';
import { CardSection, Button } from '../../common';

class preCreateMetricScreen extends Component {
  onCreateMetric() {
    const { metricName } = this.props;
    this.props.createMetric({ metricName });
  }

  render() {
    return (
      <View>
        <MetricForm />

        <CardSection>
          <Button onPress={this.onCreateMetric.bind(this)}>
            Create Metric
          </Button>
        </CardSection>
      </View>
    );
}
}

const mapStateToProps = state => {
  return {
    metricName: state.metricForm.metricName
  };
};

const CreateMetricScreen = connect(mapStateToProps, { createMetric })(preCreateMetricScreen)

export { CreateMetricScreen };
