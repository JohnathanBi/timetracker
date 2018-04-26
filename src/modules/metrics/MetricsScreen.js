import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MetricsList } from '.';

class MetricsScreen extends Component {
  render() {
    return (
      <ScrollView>
      <View>
        <Text style={headerTextStyle}>
          My Metrics
        </Text>
        <MetricsList />
      </View>
      </ScrollView>
    );
  }
}

const headerTextStyle = {
  marginTop: 34,
  marginLeft: 20,
  marginBottom: 17,
  fontSize: 34,
  textAlign: 'left'
};

export { MetricsScreen };
