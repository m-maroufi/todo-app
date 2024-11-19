import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {useAuth} from "../hooks/useAuth.jsx";

const PrivateRoutes = () => {
    const {user} = useAuth();
    return (
        user.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true}/>
    );
};

export default PrivateRoutes;