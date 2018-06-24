import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchLazy, selectEvent, eventListSelector } from '../../ducks/events';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import TableRow from './TableRow';
import 'react-virtualized/styles.css';

class VirtualizedEventsList extends Component {
    componentDidMount() {
        this.props.fetchLazy();
    }

    render() {
        const { events, loaded } = this.props;
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
							headerClassName='tableHeader'
                            width={1135}
                            height={300}
							className='table'
                            onRowClick={this.handleRowClick}
                            onRowsRendered={onRowsRendered}
                            overscanRowCount={5}
                            rowRenderer={this.rowRenderer}
							rowClassName='tableRow'
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
                                width={385}
                            />
                        </Table>
                    }
                </InfiniteLoader>
            </div>
        );
    }

    rowRenderer = (props) => <TableRow {...props} />;

    isRowLoaded = ({ index }) => index < this.props.events.length;

    loadMoreRows = () => {
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