import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

class PersonAddForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h2>Add person:</h2>
                <form onSubmit={handleSubmit}>
                    <Field name='firstName' component={ErrorField} />
                    <Field name='lastName' component={ErrorField} />
                    <Field name='email' component={ErrorField} />
                    <div>
                        <input type='submit' />
                    </div>
                </form>
            </div>
        );
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {};

    if (!firstName) errors.firstName = 'this field must be filled out';
    if (!lastName) errors.lastName = 'this field must be filled out';

    if (!email) errors.email = 'this field must be filled out';
    else if (!emailValidator.validate(email)) errors.email = 'incorrect email format';

    return errors;
};

export default reduxForm({
    form: 'people',
    validate,
})(PersonAddForm);