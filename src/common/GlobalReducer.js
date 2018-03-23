import {
  CATEGORIES_FETCH_SUCCESS,
  METRICS_FETCH_SUCCESS
} from '.';

const INITIAL_STATE = {
  allCategories: null,
  activeCategories: null,
  allMetrics: null,
  activeMetrics: null
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
    default:
      return state;
  }
}
