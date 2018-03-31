import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../../common';
import { connect } from 'react-redux';
import _ from 'lodash';

class ListItem extends Component{

  onRowPress(){
    //Actions.editCategoryScreen({ category: this.props.category });
  }

  renderMetricsList(){
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
    const { categoryUid, startTime, endTime, activityMetrics } = this.props.activity.item;
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <CardSection>
          <Text>
            {categoryName}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {`startTime: ${startTime} ${new Date(startTime)} `}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {`endTime: ${endTime} ${new Date(endTime)}`}
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
