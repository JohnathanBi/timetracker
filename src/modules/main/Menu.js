import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { Icons, IconButton } from '../../common/assets/icons';
import { clearGlobalData, globalPropertyUpdate, ACTIVTIES_SCREEN, STATISTICS_SCREEN, METRICS_SCREEN, CATEGORIES_SCREEN } from '../../common';

import { clearMetricFormData } from '../metrics';
import { clearCategoryFormData } from '../categories';
import { clearActivityFormData } from '../activities';

import { MenuItemContainer } from '.';


class preMenu extends Component{

  onLogOut() {
    //TODO might want to clean up state.
    this.props.clearGlobalData();
    this.props.clearActivityFormData();
    this.props.clearMetricFormData();
    this.props.clearCategoryFormData();
    firebase.auth().signOut().then(() => Actions.authentication());
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 15 }}>

        <MenuItemContainer thisPage={ACTIVTIES_SCREEN} closeMenu={this.props.closeMenu}>
          <IconButton iconSource={Icons.dailyIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Daily View
          </Text>
        </MenuItemContainer>

        <MenuItemContainer thisPage={STATISTICS_SCREEN} closeMenu={this.props.closeMenu}>
          <IconButton iconSource={Icons.statsIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Weekly Stats
          </Text>
        </MenuItemContainer>

        <MenuItemContainer thisPage={METRICS_SCREEN} closeMenu={this.props.closeMenu}>
          <IconButton iconSource={Icons.metricsIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            My Metrics
          </Text>
        </MenuItemContainer>

        <MenuItemContainer thisPage={CATEGORIES_SCREEN} closeMenu={this.props.closeMenu}>
          <IconButton iconSource={Icons.categoriesIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            My Categories
          </Text>
        </MenuItemContainer>

        <TouchableOpacity onPress={() => { this.onLogOut(); }}>
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
    borderColor: '#fff',
    position: 'relative'
  },
  menuItemIconStyle: {
    marginTop: 14,
    marginLeft: 20
  },
  menuItemTextStyle: {
    marginLeft: 22,
    marginTop: 18,
    fontSize: 17,
    fontWeight: 'bold'
  }
};

const Menu = connect(null, { clearGlobalData, clearMetricFormData, clearActivityFormData, clearCategoryFormData })(preMenu);

export { Menu };
