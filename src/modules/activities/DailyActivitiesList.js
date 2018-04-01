import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from '.';

class preDailyActivitiesList extends Component {

  componentWillMount(){
    console.log('testing', this.props.dailyActivities);
  }

  getCategoryNameFromUID(categoryUid) {
    const { allCategories } = this.props;

    for (let uid in allCategories){
      if (categoryUid === uid) {
        const { categoryName } = allCategories[uid];
        return categoryName;
      }
    }

    return null;
  }

  getNamedMetricsListFromUidList(uidMetricsList) {
    let namedMetricsList = {};

    for(let uidActivity in uidMetricsList){
      for(let uid in this.props.allMetrics){

        if(uidActivity === uid){
          const { metricName } = this.props.allMetrics[uid];
          namedMetricsList = { ...namedMetricsList, [metricName]: uidMetricsList[uid] };
        }
      }
    }

    return namedMetricsList;
  }

  renderRow(activity) {
    const { categoryUid, startTime, endTime, activityMetrics, uid } = activity.item;
    const categoryName = this.getCategoryNameFromUID(categoryUid);
    const namedMetricsList = this.getNamedMetricsListFromUidList(activityMetrics);
    return <ListItem activity={activity.item} categoryName={categoryName} namedMetricsList={namedMetricsList} key={uid} />;
  }

  render() {
    return (

        <FlatList
          data={this.props.dailyActivities}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={activity => activity.uid}
          scrollEnabled
        />
    );
  }
}

const mapStateToProps = state => {
  const { dailyActivities, allCategories, allMetrics } = state.global;

  return {
    dailyActivities,
    allMetrics,
    allCategories
  };
}

const DailyActivitiesList = connect(mapStateToProps, null)(preDailyActivitiesList);

export { DailyActivitiesList };
