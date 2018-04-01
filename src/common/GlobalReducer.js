import {
  CATEGORIES_FETCH_SUCCESS,
  METRICS_FETCH_SUCCESS,
  ACTIVITIES_FETCH_SUCCESS
} from '.';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  allCategories: null,
  activeCategories: null,
  allMetrics: null,
  activeMetrics: null,
  allActivities: null
};

export const GlobalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      const allCategories = action.payload;
      let activeCategories = {};

      for(let uid in allCategories){
        const { isDeleted } = allCategories[uid];

        if(!isDeleted){
          activeCategories = { ...activeCategories, [uid]: allCategories[uid] };
        }
      }

      return {...state, allCategories, activeCategories  };

      case METRICS_FETCH_SUCCESS:
        const allMetrics = action.payload;
        let activeMetrics = {};

        for(let uid in allMetrics){
          const { isDeleted } = allMetrics[uid];

          if(!isDeleted){
            activeMetrics = { ...activeMetrics, [uid]: allMetrics[uid] };
          }
        }

        return {...state, allMetrics, activeMetrics  };

    case ACTIVITIES_FETCH_SUCCESS:

      let allActivities = _.map(action.payload, (val, uid) => {
        return { ...val, uid };
      });
      allActivities = _.orderBy(allActivities, ['startTime']);

      //get Daily Activities
      const today = moment();
      const dailyActivities = [];
      for (let i = 0; i < allActivities.length; i++) {
        const { startTime, endTime } = allActivities[i];

        //this is for blocks that span multiple days
        if (moment(startTime).isBefore(today) && moment(endTime).isAfter(today)) {
          dailyActivities.push(allActivities[i]);
        } else if (moment(startTime).isSame(today, 'd') || moment(endTime).isSame(today, 'd')) {
          dailyActivities.push(allActivities[i]);
        }
      }

      console.log(allActivities);

      return { ...state, allActivities, dailyActivities };

    default:
      return state;
  }
}
