import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll } from '../../ducks/events';

class EventsList extends Component {
  componentDidMount() {
	this.props.fetchAll();
  }	

  render() {
	const { events } = this.props;
    return (
	  <div>
	    
	  </div>
    );
  }
}

export default connect(state => ({
	events: state[moduleName].entities,
}), { fetchAll })(EventsList);