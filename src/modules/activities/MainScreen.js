import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardSection, Button, fetchCategories, fetchMetrics, fetchActivities, clearGlobalData } from '../../common';
import { DailyActivitiesList, clearActivityFormData, DateSelector } from '.'; //TODO
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { clearMetricFormData } from '../metrics';
import { clearCategoryFormData } from '../categories';
import firebase from 'firebase';
import { Header, Menu } from '../../common/gui';
import { Icons, IconButton } from '../../common/assets/icons';
import SideMenu from 'react-native-side-menu';


class preMainScreen extends Component {

    constructor(props) {
      super(props);
      this.state = { menuOpen: false };
    }

    componentWillMount() {
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

      firebase.auth().signOut().then(() => Actions.authentication());
    }



    render() {

      return (
        <SideMenu
          menu={<Menu />}
          disableGestures
          isOpen={this.state.menuOpen}
          onChange={(isOpen) => { this.setState({ menuOpen: isOpen }); }}
        >

          <View style={{ flex: 1, backgroundColor:'#fff' }}>
          <Header>
            <IconButton
              onPress={() => { this.setState({ menuOpen: true }); }}
              iconSource={Icons.menuIcon}
              overRideStyles={{ marginTop: 31, marginLeft: 18 }}
            />

            <IconButton
              onPress={console.log('its working')}
              iconSource={Icons.addIcon}
              overRideStyles={{ marginTop: 31, marginRight: 19 }}
            />
          </Header>

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

          </View>
        </SideMenu>
      );
    }
}




const mapStateToProps = state => {
  return { master: state };
}

const MainScreen = connect(mapStateToProps, { fetchMetrics, fetchCategories, fetchActivities, clearGlobalData, clearMetricFormData, clearActivityFormData, clearCategoryFormData })(preMainScreen);

export { MainScreen };
