import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { moduleName } from '../../ducks/auth';
import UnAuthorized from './UnAuthorized';

const ProtectedRoute = (props) => {
    const { component: ProtectedComponent, authorized, ...rest } = props;

    const renderRoute = (routeProps) => {
        return authorized
            ? <ProtectedComponent {...routeProps} />
            : <UnAuthorized {...routeProps} />
    };

    return (
        <Route {...rest} render={renderRoute} />
    );
};

export default connect(
    state => ({
        authorized: !!state[moduleName].user,
    }), null, null, {pure: false}
)(ProtectedRoute);
