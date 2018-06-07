import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class SignInForm extends Component {
  render() {
	const { handleSubmit } = this.props;
    return (
	  <div>
	    <h2>Sing In</h2>
		<form onSubmit={handleSubmit}>
		  <div>
		    <label>email: </label>
			<Field name='name' component='input' />
		  </div>
		  <div>
		    <label>pass: </label>
			<Field name='pass' component='input' type='password' />
		  </div>
		  <div>
		    <input type='submit' />
		  </div>
		</form>
	  </div>
    );
  }
}

export default reduxForm({
	form: 'auth',
})(SignInForm);