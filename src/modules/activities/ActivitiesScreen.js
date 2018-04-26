import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, Button} from '../../common';
import { DailyActivitiesList, clearActivityFormData, DateSelector } from '.'; //TODO
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Header, Menu } from '../../common/gui';
import { Icons, IconButton } from '../../common/assets/icons';



class preActivitiesScreen extends Component {

    constructor(props) {
      super(props);
      this.state = { menuOpen: false };
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

const ActivitiesScreen = connect(mapStateToProps, null)(preActivitiesScreen);

export { ActivitiesScreen };
