import React, { Component } from 'react';
import { selectedListSelector } from '../../ducks/events';
import { connect } from 'react-redux';
import EventCard from './EventCard';

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        const { events } = this.props;
        return (
            <div>
                {events.map(event => <EventCard event = {event} key = {event.uid}/>)}
            </div>
        );
    }
}

export default connect(state => ({
    events: selectedListSelector(state)
}))(SelectedEvents);