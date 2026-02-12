import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LogInIcon } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) {
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
            <div className='max-w-md w-full'>
                <div className='text-center mb-8'>
                    <LogInIcon className='size-12 mx-auto mb-4 text-primary' />
                    <h1 className='text-3xl font-bold'>Welcome Back</h1>
                    <p className='text-base-content/70 mt-2'>Login to access your notes</p>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Email</span>
                                </label>
                                <input
                                    type='email'
                                    placeholder='your@email.com'
                                    className='input input-bordered'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-control mb-6'>
                                <label className='label'>
                                    <span className='label-text'>Password</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='Enter your password'
                                    className='input input-bordered'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button 
                                type='submit' 
                                className='btn btn-primary w-full'
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className='divider'>OR</div>

                        <p className='text-center text-sm'>
                            Don't have an account?{' '}
                            <Link to='/register' className='link link-primary'>
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
