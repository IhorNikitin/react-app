import React, { Component } from 'react';
import {List} from 'react-virtualized';
import {connect} from 'react-redux';
import {peopleListSelector, fetchAll} from '../../ducks/people';
import PersonCard from './PersonCard';

class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAll()
    }

    render() {
        return (
		    <div className='peopleList' title='you can drag people to selected events'>
				<h3>People List: </h3>
				<List
					rowCount={this.props.people.length}
					rowHeight={60}
					height={220}
					width={400}
					className='list'
					rowRenderer={this.rowRenderer}
				/>
			</div>
        )
    }

    rowRenderer = ({ index, key, style }) => <PersonCard person = {this.props.people[index]} key = {key} style = {style}/>
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAll})(PeopleList)