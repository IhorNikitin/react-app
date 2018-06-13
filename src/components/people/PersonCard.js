import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

class PersonCard extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.connectPreview(getEmptyImage());
    }

    render() {
        const {person, style, connectDragSource, isDragging } = this.props;
        const dragStyle = {
            backgroundColor: isDragging ? 'grey' : 'white'
        };
        return connectDragSource(
            <div style={{width: 200, height: 100, ...dragStyle, ...style}}>
                <h3>{person.firstName}&nbsp;{person.lastName}</h3>
                <p>{person.email}</p>
            </div>
        );
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid: props.person.uid
        }
    },
    endDrag(props, monitor) {
        const personUid = props.person.uid;
        const dragRes = monitor.getDropResult();
        const eventUid = dragRes && dragRes.eventUid;
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectPreview: connect.dragPreview(),
});

export default DragSource('person', spec, collect)(PersonCard);