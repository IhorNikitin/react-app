import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchLazy, selectEvent, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';

class VirtualizedEventsList extends Component {
    componentDidMount() {
        this.props.fetchLazy();
    }

    render() {
        const { events, loading, loaded } = this.props;
        if (loading) return <Loader />;
        return (
            <div>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    rowCount={loaded ? events.length : events.length + 1}
                    loadMoreRows={this.loadMoreRows}
                >
                    {
                        ({ onRowsRendered, registerChild }) =>
                        <Table
                            ref={registerChild}
                            rowCount={events.length}
                            rowGetter={({ index }) => events[index]}
                            rowHeight={30}
                            headerHeight={50}
                            width={1000}
                            height={300}
                            onRowClick={this.handleRowClick}
                            onRowsRendered={onRowsRendered}
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
                    }
                </InfiniteLoader>
            </div>
        );
    }

    isRowLoaded = ({ index }) => index < this.props.events.length;

    loadMoreRows = () => {
        console.log('-----', 'load more');
        this.props.fetchLazy();
    };

    handleRowClick = ({rowData}) => {
        const { selectEvent } = this.props;
        selectEvent && selectEvent(rowData.uid);
    };
}

export default connect(state => ({
    events: eventListSelector(state),
    loading: !!state[moduleName].loading,
    loaded: state[moduleName].loaded,
}), { fetchLazy, selectEvent })(VirtualizedEventsList);