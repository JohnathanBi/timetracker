import React, { Component } from 'react';
import { Card, CardSection, Button } from '../../common';
import { connect } from 'react-redux';
import { CategoryForm, categoryPropertyUpdate, updateCategory } from '.';


class preEditCategoryScreen extends Component {

  componentWillMount() {
    for(let property in this.props.category.item) {
      console.log(property, this.props.category.item[property]);

      this.props.categoryPropertyUpdate({ prop: property, value: this.props.category.item[property] });
    }
  }

  onUpdateCategory() {
    const { uid, isDeleted, categoryName } = this.props;

    this.props.updateCategory({ uid, isDeleted, categoryName });
  }

  onDeleteCategory() {
    const { uid, categoryName } = this.props;

    this.props.updateCategory({ uid, isDeleted: true, categoryName });
  }

  render() {
     return (
       <Card>
        <CategoryForm />

        <CardSection>
          <Button onPress={this.onUpdateCategory.bind(this)}>
            Save
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onDeleteCategory.bind(this)}>
            Delete
          </Button>
        </CardSection>
       </Card>
     );
  }

}


const mapStateToProps = state => {
  const { categoryName, isDeleted, uid } = state.categoryForm;

  return { categoryName, isDeleted, uid };
}

const EditCategoryScreen = connect(mapStateToProps, { categoryPropertyUpdate, updateCategory })(preEditCategoryScreen);

export { EditCategoryScreen }
