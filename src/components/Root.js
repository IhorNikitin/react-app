import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdminPage from './routes/AdminPage';
import AuthPage from './routes/AuthPage';
import PersonPage from './routes/PersonPage';
import EventsPage from './routes/EventsPage';
import ProtectedRoute from './common/ProtectedRoute';
import { connect } from 'react-redux';
import { moduleName, signOut } from '../ducks/auth';
import { Link } from 'react-router-dom';
import CustomDragLayer from './CustomDragLayer';

class Root extends Component {
  render() {
	const { signedIn, signOut } = this.props;
	const btn = signedIn
	    ? <button onClick={signOut}>SignOut</button>
		: <Link to='/auth/signin'>Sign In</Link>
    return (
      <div>
	    {btn}
        <ul>
            <li><Link to='admin'>Admin</Link></li>
            <li><Link to='people'>People List</Link></li>
            <li><Link to='events'>Event List</Link></li>
        </ul>
        <ProtectedRoute path='/admin' component={AdminPage} />
        <ProtectedRoute path='/people' component={PersonPage} />
		<ProtectedRoute path='/events' component={EventsPage} />
		<Route path='/auth' component={AuthPage} />
        <CustomDragLayer />
      </div>
    );
  }
}

export default connect(state => ({
	signedIn: !!state[moduleName].user,
}), { signOut }, null, { pure: false } )(Root);
