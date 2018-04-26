import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { Actions } from 'react-native-router-flux';

import { clearMetricFormData, MetricsScreen } from '../metrics';
import { clearCategoryFormData, CategoriesScreen } from '../categories';
import { clearActivityFormData, ActivitiesScreen } from '../activities';

import { Header } from '../../common/gui';
import { Icons, IconButton } from '../../common/assets/icons';
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

    changeMenuState() {
      this.setState({ menuOpen: !this.state.menuOpen });
    }

    onAddIconPressed() {
      const currentPage = this.props.currentPage;

      switch (currentPage) {

        case ACTIVTIES_SCREEN:
          Actions.addActivityScreen();
          break;

        case STATISTICS_SCREEN:
          console.log('stats screen add selected');
          break;

        case METRICS_SCREEN:
          Actions.createMetricScreen();
          break;

        case CATEGORIES_SCREEN:
          Actions.createCategoryScreen();
          break;

        default:
          console.log('Page Rendering Error');
          return null;

      }
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
          menu={<Menu closeMenu={this.changeMenuState.bind(this)} />}
          disableGestures
          openMenuOffset={Dimensions.get('window').width - 60}
          isOpen={this.state.menuOpen}
          onChange={(isOpen) => { this.setState({ menuOpen: isOpen }); }}
        >

          <View style={{ flex: 1, backgroundColor:'#fff' }}>
          <Header>
            <IconButton
              onPress={() => { this.changeMenuState() }}
              iconSource={Icons.menuIcon}
              overRideStyles={{ marginTop: 31, marginLeft: 18 }}
            />

            <IconButton
              iconSource={Icons.addIcon}
              onPress={() => { this.onAddIconPressed(); }}
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

const HomeScreen = connect(mapStateToProps, { fetchMetrics, fetchCategories, fetchActivities })(preHomeScreen);

export { HomeScreen };
