import React, { Component } from 'react';
import VirtualizedEventsList from '../events/VirtualizedEventsList';

class EventsPage extends Component {
  render() {
    return (
	  <div>
	    <h2>Events Page</h2>
		<VirtualizedEventsList />
	  </div>
    );
  }
}

export default EventsPage;