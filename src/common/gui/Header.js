import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Header extends Component {

  render() {
    return (
      <View style={style.headerStyle}>
        {this.props.children}
      </View>
    );
  }
}

const style = {
  headerStyle: {
    height: 72,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    position: 'relative'
  }
};


export { Header };
