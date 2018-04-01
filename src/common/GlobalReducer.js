import {
  CATEGORIES_FETCH_SUCCESS,
  METRICS_FETCH_SUCCESS,
  ACTIVITIES_FETCH_SUCCESS,
  CLEAR_GLOBAL_DATA,
  CHANGE_DISPLAY_DATE
} from '.';
import _ from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  allCategories: null,
  activeCategories: null,
  allMetrics: null,
  activeMetrics: null,
  allActivities: null,
  displayDate: moment().format()
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


      const displayDate = moment(state.displayDate);
      const dailyActivities = [];
      for (let i = 0; i < allActivities.length; i++) {
        const { startTime, endTime } = allActivities[i];

        //this is for blocks that span multiple days
        if (moment(startTime).isBefore(displayDate) && moment(endTime).isAfter(displayDate)) {
          dailyActivities.push(allActivities[i]);
        } else if (moment(startTime).isSame(displayDate, 'd') || moment(endTime).isSame(displayDate, 'd')) {
          dailyActivities.push(allActivities[i]);
        }
      }

      return { ...state, allActivities, dailyActivities };

    case CLEAR_GLOBAL_DATA:
      return INITIAL_STATE;

    case CHANGE_DISPLAY_DATE:


      //increment or decrease the display date
      const currentDisplayDate = moment(state.displayDate);

      if(action.payload === '+'){
        currentDisplayDate.add(1, 'days');
      }else if(action.payload === '-'){
        currentDisplayDate.subtract(1, 'days');
      }

      //Update the daily activities ListItem
      const allCurrentActivities = state.allActivities;
      const newDailyActivities = [];
      for (let i = 0; i < allCurrentActivities.length; i++) {
        const { startTime, endTime } = allCurrentActivities[i];

        //this is for blocks that span multiple days
        if (moment(startTime).isBefore(currentDisplayDate) && moment(endTime).isAfter(currentDisplayDate)) {
          newDailyActivities.push(allCurrentActivities[i]);
        } else if (moment(startTime).isSame(currentDisplayDate, 'd') || moment(endTime).isSame(currentDisplayDate, 'd')) {
          newDailyActivities.push(allCurrentActivities[i]);
        }
      }


      return { ...state, displayDate: currentDisplayDate.format(), dailyActivities: newDailyActivities };
    default:
      return state;
  }
}
