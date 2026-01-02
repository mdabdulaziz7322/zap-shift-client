import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation();
  

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate state={{from: location.pathname}} to="/login"></Navigate>;
    }
    return children;
};

export default PrivateRoute;