import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../../common';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

class ListItem extends Component{

  onRowPress() {
    Actions.editActivityScreen({ activity: this.props.activity });
  }

  renderMetricsList() {
    const { namedMetricsList } = this.props;
    const metricsList = _.map(namedMetricsList,
      (magnitude, metricName) => {
        return (
          <CardSection>
            <Text>
              {`${metricName}: ${magnitude}`}
            </Text>
          </CardSection>
        );
      }
    );

    return metricsList;

  }

  render() {
    const { categoryName } = this.props;
    const { startTime, endTime } = this.props.activity;
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <CardSection>
          <Text>
            {categoryName}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {`startTime: ${moment(startTime).format('LLLL')} `}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {`endTime:  ${moment(endTime).format('LLLL')}`}
          </Text>
        </CardSection>

        <CardSection>
          {this.renderMetricsList()}
        </CardSection>

      </TouchableOpacity>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

export { ListItem };
