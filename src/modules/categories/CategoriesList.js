import React, { Component } from 'react';
import {  FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from '.';
import _ from 'lodash';

class preCategoriesList extends Component {

  renderRow(category) {
    return <ListItem category={category} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.activeCategories}
        renderItem={this.renderRow}
        keyExtractor={category => category.uid}
      />
    );
  }

}
const mapStateToProps = state => {
  //this function turns an object { uid: val, uid: val } into an array [{...val, uid}, {...}, ...]
  const activeCategories = _.map(state.global.activeCategories, (val, uid) => {
    return { ...val, uid };
  });

  return { activeCategories };
};

const CategoriesList = connect(mapStateToProps, null )(preCategoriesList);

export { CategoriesList };
