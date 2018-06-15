import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { deleteEvent } from '../ducks/events';

class Garbage extends Component {

    render() {
        const { connectDropTarget, hovered } = this.props;

        const style = {
            position: 'fixed',
            top: 0,
            right: 0,
            width: '150px',
            height: '150px',
            cursor: 'pointer',
            backgroundColor: '#ccc',
            border: `1px solid ${hovered ? 'green' : 'black'}`
        };

        return connectDropTarget(
            <div style={style}>It's a garbage!</div>
        );
    }

}

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem();
        props.deleteEvent(item.uid);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
});

export default connect(null, { deleteEvent })(DropTarget(['event'], spec, collect)(Garbage));