import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

    const {user, loading} = useContext(AuthContext);

    if (loading) {
        return <div>loading...</div>;
    }
    return user ? <Outlet></Outlet> : <Navigate to="/auth/login"></Navigate>
};

export default PrivateRoute;