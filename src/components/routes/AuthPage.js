import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import { connect } from 'react-redux';
import { signUp, moduleName } from '../../ducks/auth';
import Loader from '../common/Loader';

class AuthPage extends Component {
  render() {
    const { loading } = this.props;
    return (
	  <div>
	    <h2>Authorization Page</h2>
		<NavLink to='/auth/signin' activeStyle={{ color: 'red' }} >Sign in</NavLink>
		<NavLink to='/auth/signup' activeStyle={{ color: 'red' }} >Sign up</NavLink>
		<Route path='/auth/signin' render={() => <SignInForm onSubmit={this.handleSignIn} />} />
		<Route path='/auth/signup' render={() => <SignUpForm onSubmit={this.handleSignUp} />} />
        {
            loading && <Loader />
        }
	  </div>
    );
  }
  handleSignIn = (values) => console.log('-----', values);
  handleSignUp = ({ email, pass }) => this.props.signUp(email, pass);
}

export default connect(
    state => ({
        loading: state[moduleName].loading,
    }),
    { signUp }
)(AuthPage);