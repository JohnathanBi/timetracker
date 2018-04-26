import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MetricsList } from '.';

class MetricsScreen extends Component {
  render() {
    return (
      <View>
        <MetricsList />
      </View>
    );
  }
}

export { MetricsScreen };
