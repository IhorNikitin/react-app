import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll, peopleListSelector } from '../../ducks/people';
import Loader from '../common/Loader';
import { Table, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

class VirtualizedPeopleList extends Component {
    componentDidMount() {
        this.props.fetchAll();
    }

    render() {
        const { people, loading } = this.props;
        if (loading) return <Loader />;
        return (
            <div>
                <Table
                    rowCount={people.length}
                    rowGetter={({ index }) => people[index]}
                    rowHeight={30}
                    headerHeight={50}
                    width={1000}
                    height={300}
                >
                    <Column
                        dataKey='firstName'
                        label='Name'
                        width={300}
                    />
                    <Column
                        dataKey='lastName'
                        label='Surname'
                        width={300}
                    />
                    <Column
                        dataKey='email'
                        label='Email'
                        width={400}
                    />
                </Table>
            </div>
        );
    }
}

export default connect(state => ({
    people: peopleListSelector(state),
    loading: !!state[moduleName].loading,
}), { fetchAll })(VirtualizedPeopleList);