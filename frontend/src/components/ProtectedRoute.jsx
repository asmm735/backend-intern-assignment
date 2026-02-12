import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LoaderIcon } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10 text-primary' />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return children;
};

export default ProtectedRoute;
