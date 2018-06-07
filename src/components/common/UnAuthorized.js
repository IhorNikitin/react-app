import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
    return (
        <h2>You are unauthorized! Go to the <Link to='/auth'>Auth page</Link>!</h2>
    );
};

export default UnAuthorized;