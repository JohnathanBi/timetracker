import React, { Component } from 'react';
import {  FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../common';
import { ListItem } from '.';
import _ from 'lodash';

class preCategoriesList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  renderRow(category) {
    return <ListItem category={category} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.categories}
        renderItem={this.renderRow}
        keyExtractor={category => category.uid}
      />
    );
  }

}
const mapStateToProps = state => {
  //this function turns an object { uid: val, uid: val } into an array [{...val, uid}, {...}, ...]
  const categories = _.map(state.global, (val, uid) => {
    return { ...val, uid };
  });

  return { categories };
};

const CategoriesList = connect(mapStateToProps, { fetchCategories })(preCategoriesList);

export { CategoriesList };
