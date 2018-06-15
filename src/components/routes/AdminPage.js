import React, { Component } from 'react';
import PeopleList from '../people/PeopleList';
import EventsList from '../events/VirtualizedEventsList';
import SelectedEvents from '../events/SelectedEvents';
import Garbage from '../Garbage';

class AdminPage extends Component {
  render() {
    return (
	  <div>
	    <h2>Admin Page</h2>
        <PeopleList />
        <SelectedEvents />
        <EventsList />
        <Garbage />
	  </div>
    );
  }
}

export default AdminPage;