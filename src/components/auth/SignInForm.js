import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SignInForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className='signIn'>
                <h3>Sing In</h3>
                <form onSubmit={handleSubmit}>
                    <div className='field'>
                        <label>email: </label>
                        <Field name='email' component='input' />
                    </div>
                    <div className='field'>
                        <label>pass: </label>
                        <Field name='pass' component='input' type='password' />
                    </div>
                    <div className='field'>
                        <input type='submit' value='Submit'/>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'auth',
})(SignInForm);
