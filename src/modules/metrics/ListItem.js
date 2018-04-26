import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { Icons, IconButton } from '../../common/assets/icons';

import { connect } from 'react-redux';
import { updateMetric } from '.';

class preListItem extends Component{

  onRowPress() {
    Actions.editMetricScreen({ metric: this.props.metric });
  }

  onDeleteMetric() {
    const { uid, metricName } = this.props.metric.item;
    this.props.updateMetric({ uid, isDeleted: true, metricName });
  }

  render() {
    const { metricName } = this.props.metric.item;
    return (
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>
            {metricName}
          </Text>

          <View style={styles.iconContainerStyle}>
            <IconButton
              iconSource={Icons.editIconDark}
              onPress={this.onRowPress.bind(this)}
              overRideStyles={{ marginRight: 19 }}
              />

            <IconButton
             iconSource={Icons.deleteIconDark}
             onPress={this.onDeleteMetric.bind(this)}
             />
          </View>
        </View>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textStyle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 4
  },
  iconContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
}

const ListItem = connect(null, { updateMetric })(preListItem);

export { ListItem };
