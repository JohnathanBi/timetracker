import React, { Component } from 'react';
import { View } from 'react-native';
import { MetricForm, createMetric } from '.';
import { connect } from 'react-redux';
import { CardSection, Button } from '../../common';

import { Header, BottomActionBar } from '../../common/gui';
import { Icons, IconButton } from '../../common/assets/icons';

import { Actions } from 'react-native-router-flux';

class preCreateMetricScreen extends Component {
  onCreateMetric() {
    const { metricName } = this.props;
    this.props.createMetric({ metricName });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          justifyContent: 'space-between'
        }}
      >

        <View>
          <Header>
            <IconButton
              overRideStyles={{ marginLeft: 18, marginTop: 30 }}
              iconSource={Icons.backIcon}
              onPress={() => { Actions.pop(); }}
            />
          </Header>

          <MetricForm />
        </View>


        <BottomActionBar text={'Save'} onPress={this.onCreateMetric.bind(this)} />

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
