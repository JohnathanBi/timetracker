import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icons, IconButton } from '../../common/assets/icons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { globalPropertyUpdate, ACTIVTIES_SCREEN, STATISTICS_SCREEN, METRICS_SCREEN, CATEGORIES_SCREEN } from '../../common';

class preMenuItemContainer extends Component{

  switchPage(newPage){
    this.props.globalPropertyUpdate({ prop: 'currentMainPage', value: newPage });
  }


  render()  {
    let isSelected = false;

    if (this.props.currentPage === this.props.thisPage){
      isSelected = true;
    }

    return (
      <TouchableOpacity onPress={() => { this.switchPage(this.props.thisPage); }}>
      <View style={isSelected ? [style.menuItemContainerStyle, { backgroundColor: '#f1f1f1' }] : style.menuItemContainerStyle}>
        {this.props.children}
      </View>
      </TouchableOpacity>
    );
  }
}


const mapStateToProps = state => {
  return { currentPage: state.global.currentMainPage };
}

const MenuItemContainer = connect(mapStateToProps, { globalPropertyUpdate })(preMenuItemContainer);


class Menu extends Component{
  render() {


    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 15 }}>

      <Text>
        {this.props.currentPage}
      </Text>

        <MenuItemContainer thisPage={ACTIVTIES_SCREEN}>
          <IconButton iconSource={Icons.dailyIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Daily View
          </Text>
        </MenuItemContainer>

        <MenuItemContainer thisPage={STATISTICS_SCREEN}>
          <IconButton iconSource={Icons.statsIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            Weekly Stats
          </Text>
        </MenuItemContainer>

        <MenuItemContainer thisPage={METRICS_SCREEN}>
          <IconButton iconSource={Icons.metricsIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            My Metrics
          </Text>
        </MenuItemContainer>

        <MenuItemContainer thisPage={CATEGORIES_SCREEN}>
          <IconButton iconSource={Icons.categoriesIcon} overRideStyles={style.menuItemIconStyle} />
          <Text style={style.menuItemTextStyle}>
            My Categories
          </Text>
        </MenuItemContainer>

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




export { Menu };
