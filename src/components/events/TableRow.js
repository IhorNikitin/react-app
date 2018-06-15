import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { defaultTableRowRenderer } from 'react-virtualized';

class TableRow extends Component {

    render() {
        const { connectDragSource, ...rest } = this.props;

        return connectDragSource(
            defaultTableRowRenderer(rest)
        );
    }

}

const spec = {
    beginDrag(props) {
        return {
            uid: props.rowData.uid
        };
    },
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
});

export default (DragSource('event', spec, collect)(TableRow));