import React, { Component } from 'react';

import PeopleList from '../../people/PeopleList';
import EventsList from '../../events/VirtualizedEventsList';
import SelectedEvents from '../../events/SelectedEvents';
import Garbage from '../../Garbage';

import './AdminPage.css';

class AdminPage extends Component {
  render() {
    return (
	  <div className='adminPage'>
	    <h2>Admin Page</h2>
		<div className='assignEvent'>
            <PeopleList />
            <SelectedEvents />
			<Garbage />
		</div>
        <EventsList />
	  </div>
    );
  }
}

export default AdminPage;