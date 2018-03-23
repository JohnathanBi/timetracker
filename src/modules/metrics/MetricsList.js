import React, { Component } from 'react';
import {  FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchMetrics } from '../../common';
import { ListItem } from '.';
import _ from 'lodash';

class preMetricsList extends Component {
  componentWillMount() {
    this.props.fetchMetrics();
  }

  renderRow(metric) {
    return <ListItem metric={metric} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.metrics}
        renderItem={this.renderRow}
        keyExtractor={metric => metric.uid}
      />
    );
  }

}

const mapStateToProps = state => {
  //this function turns an object { uid: val, uid: val } into an array [{...val, uid}, {...}, ...]
  const metrics = _.map(state.global.activeMetrics, (val, uid) => {
    return { ...val, uid };
  });

  return { metrics };
};

const MetricsList = connect(mapStateToProps, { fetchMetrics })(preMetricsList);

export { MetricsList };
