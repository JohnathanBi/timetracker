import React, { Component } from 'react';
import { Card, CardSection, Button } from '../../common';
import { connect } from 'react-redux';
import { MetricForm, metricPropertyUpdate, updateMetric } from '.';


class preEditMetricScreen extends Component {

  componentWillMount() {
    for(let property in this.props.metric.item) {
      this.props.metricPropertyUpdate({ prop: property, value: this.props.metric.item[property] });
    }
  }

  onUpdateMetric() {
    const { uid, isDeleted, metricName } = this.props;

    this.props.updateMetric({ uid, isDeleted, metricName });
  }

  onDeleteMetric() {
    const { uid, metricName } = this.props;

    this.props.updateMetric({ uid, isDeleted: true, metricName });
  }

  render() {
     return (
       <Card>
        <MetricForm />

        <CardSection>
          <Button onPress={this.onUpdateMetric.bind(this)}>
            Save
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onDeleteMetric.bind(this)}>
            Delete
          </Button>
        </CardSection>
       </Card>
     );
  }

}


const mapStateToProps = state => {
  const { metricName, isDeleted, uid } = state.metricForm;

  return { metricName, isDeleted, uid };
}

const EditMetricScreen = connect(mapStateToProps, { metricPropertyUpdate, updateMetric })(preEditMetricScreen);

export { EditMetricScreen }
