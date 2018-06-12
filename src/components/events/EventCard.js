import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { addEventToPerson } from '../../ducks/people';

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event, style, connectDropTarget, hovered, canDrop } = this.props;
        const dropStyle = {
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        };
        return connectDropTarget(
            <div style={{width: 200, height: 100, ...dropStyle, ...style}}>
                <h3>{event.title}</h3>
                <p>{event.when}</p>
                <p>{event.where}</p>
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid;
        const eventUid = props.event.uid;

        props.addEventToPerson(eventUid, personUid);
        return { eventUid };
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    canDrop: monitor.canDrop(),
});

export default connect(null, { addEventToPerson })(DropTarget(['person'], spec, collect)(EventCard));