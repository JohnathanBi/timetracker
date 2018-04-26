import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


class BottomActionBar extends Component {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={style.containerStyle}>
          <Text style={style.textStyle}>
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = {
  containerStyle: {
    height: 38,
    backgroundColor: '#000000',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    marginTop: 7,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold'
  }
};


export { BottomActionBar };
