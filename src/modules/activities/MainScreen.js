import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, Button, fetchCategories, fetchMetrics, fetchActivities, clearGlobalData } from '../../common';
import { DailyActivitiesList, clearActivityFormData, DateSelector } from '.'; //TODO
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { clearMetricFormData } from '../metrics';
import { clearCategoryFormData } from '../categories';


class preMainScreen extends Component {

    componentWillMount(){
      this.props.fetchMetrics();
      this.props.fetchCategories();
      this.props.fetchActivities();
    }

    onAddActivity() {
      Actions.addActivityScreen();
    }

    onViewCategories() {
      Actions.categoriesScreen();
    }

    onEditMetrics() {
      Actions.metricsScreen();
    }

    onLogOut() {
      //TODO might want to clean up state.
      this.props.clearGlobalData();
      this.props.clearActivityFormData();
      this.props.clearMetricFormData();
      this.props.clearCategoryFormData();

      console.log(this.props.master);

      Actions.authentication();
    }

    render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <Button onPress={this.onAddActivity.bind(this)}>
              Add Activity
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onViewCategories.bind(this)}>
              Edit Categories
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onEditMetrics.bind(this)}>
              Edit Metrics
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.onLogOut.bind(this)}>
              Log Out
            </Button>
          </CardSection>


          <DateSelector />
        </Card>


        <DailyActivitiesList />
      </ScrollView>
    );
  }
}


const mapStateToProps = state => {
  return { master: state };
}

const MainScreen = connect(mapStateToProps, { fetchMetrics, fetchCategories, fetchActivities, clearGlobalData, clearMetricFormData, clearActivityFormData, clearCategoryFormData })(preMainScreen);

export { MainScreen };
