import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';


import { AddActivityScreen, MainScreen } from './modules/activities';
import { LoginScreen } from './modules/authentication';
import { ConnectedCreateCategoryScreen, CategoriesScreen } from './modules/categories';
import { EditMetricsScreen } from './modules/metrics';


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="authentication"  >
          <Scene key="login" component={LoginScreen} title="Please Login" initial />
        </Scene>

        <Scene key="main"  initial>
          <Scene key="mainScreen" component={MainScreen} title="Daily View"  initial />

          <Scene key="categoriesScreen"
          component={CategoriesScreen}
          title="Edit Categories"
          rightTitle="Add"
          onRight={() => Actions.createCategoryScreen()
          }

          />
          <Scene key="createCategoryScreen" component={ConnectedCreateCategoryScreen} title="Edit Categories"/>

          <Scene key="editMetricsScreen" component={EditMetricsScreen} title="Edit Metrics" />

          <Scene key="addActivityScreen" component={AddActivityScreen} title="Add Activity" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
