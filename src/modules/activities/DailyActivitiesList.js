import React, { Component } from 'react';
import { View, Text, FlatList,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from '.';

class preDailyActivitiesList extends Component {

  componentWillMount(){
    console.log('testing', this.props.dailyActivities);
  }

  renderRow(activity) {
    return <ListItem activity={activity} />;
  }

  render() {
    return (

      <ScrollView>
        <FlatList
          data={this.props.dailyActivities}
          renderItem={this.renderRow}
          keyExtractor={activity => activity.uid}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dailyActivities: state.global.dailyActivities
  };
}

const DailyActivitiesList = connect(mapStateToProps, null)(preDailyActivitiesList);

export { DailyActivitiesList };
