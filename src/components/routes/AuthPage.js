import React, { Component } from 'react';
import SignInForm from '../auth/SignInForm';

class AuthPage extends Component {
  render() {
    return (
	  <div>
	    <h2>Authorization Page</h2>
		<SignInForm />
	  </div>
    );
  }
}

export default AuthPage;