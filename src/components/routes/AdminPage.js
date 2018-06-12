import React, { Component } from 'react';
import PeopleList from '../people/PeopleList';
import EventsList from '../events/VirtualizedEventsList';
import SelectedEvents from '../events/SelectedEvents';

class AdminPage extends Component {
  render() {
    return (
	  <div>
	    <h2>Admin Page</h2>
        <PeopleList />
        <SelectedEvents />
        <EventsList />
	  </div>
    );
  }
}

export default AdminPage;