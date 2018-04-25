import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icons, IconButton } from '../../common/assets/icons';
import { Actions } from 'react-native-router-flux';


class Menu extends Component{

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 25 }}>

        <TouchableOpacity onPress={() => { console.log('daily'); }}>
        <View style={style.menuItemContainerStyle}>
          <IconButton iconSource={Icons.dailyIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Daily View
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { console.log('stats'); }}>
        <View style={style.menuItemContainerStyle}>
          <IconButton iconSource={Icons.statsIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Weekly Stats
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { console.log('metrics'); }}>
        <View style={style.menuItemContainerStyle}>
          <IconButton iconSource={Icons.metricsIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            My Metrics
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { console.log('categories'); }}>
        <View style={style.menuItemContainerStyle}>
          <IconButton iconSource={Icons.categoriesIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            My Categories
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { console.log('logOut'); }}>
        <View style={style.menuItemContainerStyle}>
          <IconButton iconSource={Icons.logOutIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Log Out
          </Text>
        </View>
        </TouchableOpacity>

      </View>
    );
  }
}


const style = {
  menuItemContainerStyle: {
    marginTop: 10,
    height: 54,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    position: 'relative'
  },
  menuItemIconStyle: {
    marginTop: 15,
    marginLeft: 20
  },
  menuItemTextStyle: {
    marginLeft: 22,
    marginTop: 16,
    fontSize: 17,
    fontWeight: 'bold'
  }
};


export { Menu };
