import {
  CATEGORIES_FETCH_SUCCESS,
  METRICS_FETCH_SUCCESS,
  ACTIVITIES_FETCH_SUCCESS
} from '.';
import _ from 'lodash';

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
      const today = new Date();
      const dailyActivities = [];
      for (let i = 0; i < allActivities.length; i++) {
        const { startTime, endTime } = allActivities[i];

        //this is for blocks that span multiple days
        if (startTime < (new Date(today)).getTime() && endTime > (new Date(today)).getTime()) {
          dailyActivities.push(allActivities[i]);
        } else if (isSameDay(startTime, today) || isSameDay(endTime, today)) {
          dailyActivities.push(allActivities[i]);
        }
      }

      return { ...state, allActivities, dailyActivities };

    default:
      return state;
  }
}

const isSameDay = (date1, date2) => {
  if((new Date(date1)).getFullYear() === (new Date(date2)).getFullYear()
   && (new Date(date1)).getMonth() === (new Date(date2)).getMonth()
   && (new Date(date1)).getDate() === (new Date(date2)).getDate()){
     return true;
   }else {
     return false;
   }
}
