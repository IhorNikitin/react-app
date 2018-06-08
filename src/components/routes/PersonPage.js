import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';

class PersonPage extends Component {
    render() {
        return (
            <NewPersonForm onSubmit={this.handleAddPerson}/>
        );
    }

    handleAddPerson = (person) => this.props.addPerson(person);
}

export default connect(null, { addPerson })(PersonPage);