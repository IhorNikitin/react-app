import React, { Component } from 'react';

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const {event, style} = this.props;
        return (
            <div style={{width: 200, height: 100, ...style}}>
                <h3>{event.title}</h3>
                <p>{event.when}</p>
                <p>{event.where}</p>
            </div>
        );
    }
}

export default EventCard;