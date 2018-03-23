import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input } from '../../common';
import { connect } from 'react-redux';

import { categoryPropertyUpdate } from '.';

class preCategoryForm extends Component {

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="Health"
              value={this.props.categoryName}
              onChangeText={text => this.props.categoryPropertyUpdate({ prop: 'categoryName', value: text })}
            />
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryName: state.categoryForm.categoryName,
    isDeleted: state.categoryForm.isDeleted
  };
};

const CategoryForm = connect(mapStateToProps, { categoryPropertyUpdate })(preCategoryForm);

export { CategoryForm };
