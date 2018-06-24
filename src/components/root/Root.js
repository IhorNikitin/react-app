import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../header/Header';
import AdminPage from '../routes/AdminPage/AdminPage';
import AuthPage from '../routes/AuthPage/AuthPage';
import PersonPage from '../routes/PersonPage/PersonPage';
import EventsPage from '../routes/EventsPage/EventsPage';
import ProtectedRoute from '../common/ProtectedRoute';
import { moduleName, signOut } from '../../ducks/auth';
import CustomDragLayer from '../CustomDragLayer';

import './Root.css';

class Root extends Component {
    render() {
        const { signedIn, signOut } = this.props;

        return (
            <Fragment>
                <Header
                    signedIn={signedIn}
                    signOut={signOut}
                />
                <div className='nav'>
                    <ul>
                        <li><Link to='/admin'>Admin</Link></li>
                        <li><Link to='/people'>People List</Link></li>
                        <li><Link to='/events'>Events List</Link></li>
                    </ul>
                </div>
                <ProtectedRoute path='/admin' component={AdminPage} />
                <ProtectedRoute path='/people' component={PersonPage} />
                <ProtectedRoute path='/events' component={EventsPage} />
                <Route path='/auth' component={AuthPage} />
                <CustomDragLayer />
            </Fragment>
        );
    }
}

export default connect(state => ({
    signedIn: !!state[moduleName].user,
}), { signOut }, null, { pure: false } )(Root);
