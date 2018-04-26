import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { globalPropertyUpdate } from '../../common';



class preMenuItemContainer extends Component{

  switchPage(newPage){
    this.props.globalPropertyUpdate({ prop: 'currentMainPage', value: newPage });
    this.props.closeMenu();
  }

  render()  {
    let isSelected = false;

    if (this.props.currentPage === this.props.thisPage) {
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


const mapStateToProps = state => {
  return { currentPage: state.global.currentMainPage };
}

const MenuItemContainer = connect(mapStateToProps, { globalPropertyUpdate })(preMenuItemContainer);

export { MenuItemContainer }
