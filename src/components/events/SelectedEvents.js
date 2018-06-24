import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring } from 'react-motion';

import { selectedListSelector } from '../../ducks/events';
import EventCard from './EventCard';

class SelectedEvents extends Component {
    render() {
        return (
            <TransitionMotion
                styles={this.getStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}
            >
                {(interpolated) =>
                    <div className='selectedEvents' title='you can add events to selected after click on row in table'>
                        <h3>Selected Events: </h3>
                        {interpolated.map(config => <div style={config.style} key = {config.key}>
                            <EventCard event = {config.data} />
                        </div>)}
                    </div>
                }
            </TransitionMotion>
        );
    }

    willLeave = () => ({
        opacity: spring(0, {stiffness: 100})
    });

    willEnter = () => ({
        opacity: 0
    });

    getStyles = () => {
        return this.props.events.map(event => ({
            style: {
                opacity: spring(1, {stiffness: 50})
            },
            key: event.uid,
            data: event
        }));
    };
}

export default connect(state => ({
    events: selectedListSelector(state)
}))(SelectedEvents);
