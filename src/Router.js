import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { AddActivityScreen, MainScreen, EditActivityScreen } from './modules/activities';
import { LoginScreen } from './modules/authentication';
import { CreateCategoryScreen, CategoriesScreen, EditCategoryScreen } from './modules/categories';
import { EditMetricScreen, MetricsScreen, CreateMetricScreen } from './modules/metrics';
import { HomeScreen } from './modules/main'

const RouterComponent = () => {
  return (
    <Router >
      <Scene key="root" >
        <Scene key="authentication" initial  >
          <Scene key="login" component={LoginScreen} title="Time Tracker" initial hideNavBar />
        </Scene>

        <Scene type="reset" key="main" >
          <Scene key="HomeScreen" component={HomeScreen} initial hideNavBar />

          <Scene key="categoriesScreen"
            component={CategoriesScreen}
            title="My Categories"
            rightTitle="Add"
            onRight={() => Actions.createCategoryScreen()}
          />
          <Scene key="createCategoryScreen" component={CreateCategoryScreen} title="Create Category"  />
          <Scene key="editCategoryScreen" component={EditCategoryScreen} title="Edit Category"  />


          <Scene key="metricsScreen"
            component={MetricsScreen}
            title="My Metrics"
            rightTitle="Add"
            onRight={() => Actions.createMetricScreen()}
          />
          <Scene key="editMetricScreen" component={EditMetricScreen} title="Edit Metric" />
          <Scene key="createMetricScreen" component={CreateMetricScreen} title="Create Metric" hideNavBar />


          <Scene key="addActivityScreen" component={AddActivityScreen} title="Add Activity" />
          <Scene key="editActivityScreen" component={EditActivityScreen} title="Edit Activity" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
