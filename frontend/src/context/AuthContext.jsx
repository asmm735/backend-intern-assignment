import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Set token in axios headers
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    // Get current user on mount
    useEffect(() => {
        const getCurrentUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get('/auth/me');
                setUser(res.data.user);
            } catch (error) {
                console.error('Error fetching user:', error);
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getCurrentUser();
    }, [token]);

    const register = async (username, email, password) => {
        try {
            const res = await api.post('/auth/register', {
                username,
                email,
                password
            });
            
            setToken(res.data.token);
            setUser(res.data.user);
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', {
                email,
                password
            });
            
            setToken(res.data.token);
            setUser(res.data.user);
            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
