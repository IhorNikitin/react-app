import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll, selectEvent, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

class VirtualizedEventsList extends Component {
    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        const { events, loading } = this.props;
        if (loading) return <Loader />;
        return (
            <div>
                <Table
                    rowCount={events.length}
                    rowGetter={({ index }) => events[index]}
                    rowHeight={30}
                    headerHeight={50}
                    width={1000}
                    height={300}
                    onRowClick={this.handleRowClick}
                >
                    <Column
                        dataKey='title'
                        label='title'
                        width={400}
                    />
                    <Column
                        dataKey='where'
                        label='where'
                        width={350}
                    />
                    <Column
                        dataKey='when'
                        label='month'
                        width={150}
                    />
                </Table>
            </div>
        );
    }
    handleRowClick = ({rowData}) => {
        const { selectEvent } = this.props;
        selectEvent && selectEvent(rowData.uid);
    };
}

export default connect(state => ({
    events: eventListSelector(state),
    loading: !!state[moduleName].loading,
}), { fetchAll, selectEvent })(VirtualizedEventsList);