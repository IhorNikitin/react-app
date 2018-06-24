import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPerson } from '../../../ducks/people';
import NewPersonForm from '../../people/NewPersonForm';
import PeopleList from '../../people/VirtualizedPeopleList';

import './PersonPage.css';

class PersonPage extends Component {
    render() {
        return (
            <div className='personPage'>
                <h2>People page</h2>
                <NewPersonForm onSubmit={this.handleAddPerson}/>
                <PeopleList />
            </div>
        );
    }

    handleAddPerson = (person) => this.props.addPerson(person);
}

export default connect(null, { addPerson })(PersonPage);
