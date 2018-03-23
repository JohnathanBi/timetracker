import React, { Component } from 'react';
import { View } from 'react-native';
import { CategoriesList } from '.';

class CategoriesScreen extends Component {

  render() {
    return (
      <View>
        <CategoriesList />
      </View>
    );
  }
}

export { CategoriesScreen };
