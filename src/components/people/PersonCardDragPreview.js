import React, { Component } from 'react';
import { connect } from 'react-redux';
import { personSelector } from '../../ducks/people';

class PersonCardDragPreview extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h2>{this.props.person.firstName}</h2>
            </div>
        );
    }
}

export default connect((state, props) => ({
        person: personSelector(state, props),
    })
)(PersonCardDragPreview);