import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input } from '../common';
import { connect } from 'react-redux';

import { categoryUpdate } from '.';

class preCategoryForm extends Component {

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Category Name"
              placeholder="Health"
              value={this.props.name}
              onChangeText={text => this.props.categoryUpdate({ prop: 'categoryName', value: text })}
            />
          </CardSection>
        </Card>
      </View>
    );
  }

}

const mapStateToProps = state => {
  return {
    name: state.categoryForm.name,
    isDeleted: state.categoryForm.isDeleted
  };
};

const CategoryForm = connect(mapStateToProps, { categoryUpdate })(preCategoryForm);

export { CategoryForm };
