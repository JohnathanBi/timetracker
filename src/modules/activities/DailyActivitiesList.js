import React, { Component } from 'react';
import { View, Text, FlatList,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ListItem } from '.';

class preDailyActivitiesList extends Component {

  componentWillMount(){
    console.log('testing', this.props.allActivities);
  }

  renderRow(activity) {
    return <ListItem activity={activity} />;
  }

  render() {
    return (

      <ScrollView>
        <FlatList
          data={this.props.allActivities}
          renderItem={this.renderRow}
          keyExtractor={activity => activity.uid}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const allActivities = _.map(state.global.allActivities, (val, uid) => {
    return { ...val, uid };
  });

  return { allActivities };
}

const DailyActivitiesList = connect(mapStateToProps, null)(preDailyActivitiesList);

export { DailyActivitiesList };
