import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    render() {
        const { signedIn, signOut } = this.props;
        const btn = signedIn
            ? <div className='button' onClick={signOut}>SignOut</div>
            : <div className='button'><Link to='/auth/signin'>Sign In</Link></div>
        return (
            <header className='header'>
                <div className='logo'>
                    <p>Events Assign Tool</p>
                </div>
                <div className='auth'>{btn}</div>
            </header>
        );
    }
}

export default Header;
