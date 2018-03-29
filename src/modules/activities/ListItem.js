import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../../common';

class ListItem extends Component{

  onRowPress(){
    //Actions.editCategoryScreen({ category: this.props.category });
  }

  render() {
    const { categoryUid, startTime, endTime, activityMetrics } = this.props.activity.item;
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <CardSection>
          <Text>
            {categoryUid}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {startTime}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {endTime}
          </Text>
        </CardSection>

        <CardSection>
          <Text>
            {'Activities TBD'}
          </Text>
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
