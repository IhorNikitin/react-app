import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInForm from '../../auth/SignInForm';
import SignUpForm from '../../auth/SignUpForm';
import { signUp, signIn, moduleName } from '../../../ducks/auth';
import Loader from '../../common/Loader';

import './AuthPage.css';

class AuthPage extends Component {
    render() {
        const { loading } = this.props;
        return (
            <div className='authPage'>
                <h2>Authorization Page</h2>
                <ul>
                    <li><NavLink to='/auth/signin' activeStyle={{ color: 'red' }}>Sign in</NavLink></li>
                    <li><NavLink to='/auth/signup' activeStyle={{ color: 'red' }}>Sign up</NavLink></li>
                </ul>
                <Route path='/auth/signin' render={() => <SignInForm onSubmit={this.handleSignIn} />} />
                <Route path='/auth/signup' render={() => <SignUpForm onSubmit={this.handleSignUp} />} />
                {
                    loading && <Loader />
                }
	        </div>
        );
    }

    handleSignIn = ({ email, pass }) => this.props.signIn(email, pass);
    handleSignUp = ({ email, pass }) => this.props.signUp(email, pass);
}

export default connect(
    state => ({
        loading: state[moduleName].loading,
    }),
    { signUp, signIn }
)(AuthPage);
