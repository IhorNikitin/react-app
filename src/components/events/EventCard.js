import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { addEventToPerson, peopleListSelector } from '../../ducks/people';

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event, style, connectDropTarget, hovered, canDrop, people } = this.props;
        const dropStyle = {
            border: `1px solid ${canDrop ? 'red' : 'black'}`,
            backgroundColor: hovered ? 'green' : 'white'
        };
        const peopleElement = people &&
            <p>
                {people.map(person => person.email).join(', ')}
            </p>;
        return connectDropTarget(
            <div className='eventCard' style={{...dropStyle, ...style}}>
                <h3>{event.title}</h3>
                <p>{event.when}</p>
                <p>{event.where}</p>
				<p className='addedPeople'>People: </p>
                {peopleElement}
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

export default connect((state, props) => ({
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid)),
}), { addEventToPerson })(DropTarget(['person'], spec, collect)(EventCard));