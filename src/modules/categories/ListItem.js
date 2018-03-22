import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../../common';

class ListItem extends Component{

  onRowPress(){

    //TODO Add row press action
  }

  render() {
    const { categoryName } = this.props.category.item;
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <CardSection>
          <Text>
            {categoryName}
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
