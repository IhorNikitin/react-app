import React, { Component } from 'react';

import VirtualizedEventsList from '../../events/VirtualizedEventsList';

import './EventsPage.css';

class EventsPage extends Component {
    render() {
        return (
            <div className='eventsPage'>
                <h2>Events Page</h2>
                <VirtualizedEventsList />
            </div>
        );
    }
}

export default EventsPage;
