import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
    return (
        <div style={{ height: 'calc(100% - 200px)', textAlign: 'center' }}>
            <h2>You are unauthorized! Go to the <Link to='/auth'>Auth page</Link>!</h2>
        </div>
    );
};

export default UnAuthorized;
