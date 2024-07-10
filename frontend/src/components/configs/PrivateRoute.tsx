import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Component/>;
};

export default PrivateRoute;

