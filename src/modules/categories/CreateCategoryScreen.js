import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CategoryForm, createCategory } from '.';
import { connect } from 'react-redux';
import { CardSection, Button } from '../../common';


class preCreateCategoryScreen extends Component {

  onCreateCategory() {
    const { categoryName } = this.props;
    this.props.createCategory({ categoryName });
  }

  render() {
    return (
      <View>
        <CategoryForm />

        <CardSection>
          <Button onPress={this.onCreateCategory.bind(this)}>
            Create Category
          </Button>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryName: state.categoryForm.categoryName
  };
};

const CreateCategoryScreen = connect(mapStateToProps, { createCategory })(preCreateCategoryScreen)

export { CreateCategoryScreen };
