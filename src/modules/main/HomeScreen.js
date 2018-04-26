import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { clearMetricFormData, MetricsScreen } from '../metrics';
import { clearCategoryFormData, CategoriesScreen } from '../categories';
import { clearActivityFormData, ActivitiesScreen } from '../activities'; //TODO
import firebase from 'firebase';
import { Header } from '../../common/gui';
import { Icons, IconButton } from '../../common/assets/icons';
import SideMenu from 'react-native-side-menu';

import { fetchCategories, fetchMetrics, fetchActivities, clearGlobalData, ACTIVTIES_SCREEN, STATISTICS_SCREEN, METRICS_SCREEN, CATEGORIES_SCREEN } from '../../common';
import { Menu } from '.';

class preHomeScreen extends Component {

    constructor(props) {
      super(props);
      this.state = { menuOpen: false };
    }

    componentWillMount() {
      this.props.fetchMetrics();
      this.props.fetchCategories();
      this.props.fetchActivities();
    }


    onLogOut() {
      //TODO might want to clean up state.
      this.props.clearGlobalData();
      this.props.clearActivityFormData();
      this.props.clearMetricFormData();
      this.props.clearCategoryFormData();
      firebase.auth().signOut().then(() => Actions.authentication());
    }


    renderMainScreen() {
      const currentPage = this.props.currentPage;

      switch (currentPage) {

        case ACTIVTIES_SCREEN:
          return (
            <ActivitiesScreen />
          );


        case STATISTICS_SCREEN:
          return (
            <Text>
              Stats Page
            </Text>
          );
        case METRICS_SCREEN:
          return (
            <MetricsScreen />
          );

        case CATEGORIES_SCREEN:
          return (
            <CategoriesScreen />
          );

        default:
        console.log('Page Rendering Error');
        return null;

      }
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
              iconSource={Icons.addIcon}
              overRideStyles={{ marginTop: 31, marginRight: 19 }}
            />
          </Header>


          {this.renderMainScreen()}

          </View>
        </SideMenu>
      );
    }
}




const mapStateToProps = state => {
  return { currentPage: state.global.currentMainPage };
}

const HomeScreen = connect(mapStateToProps, { fetchMetrics, fetchCategories, fetchActivities, clearGlobalData, clearMetricFormData, clearActivityFormData, clearCategoryFormData })(preHomeScreen);

export { HomeScreen };
