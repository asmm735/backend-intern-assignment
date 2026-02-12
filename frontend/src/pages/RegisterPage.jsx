import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { UserPlusIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username.trim() || !email.trim() || !password.trim()) {
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const result = await register(username, email, password);
        setLoading(false);

        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
            <div className='max-w-md w-full'>
                <div className='text-center mb-8'>
                    <UserPlusIcon className='size-12 mx-auto mb-4 text-primary' />
                    <h1 className='text-3xl font-bold'>Create Account</h1>
                    <p className='text-base-content/70 mt-2'>Join us and start taking notes</p>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Username</span>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Choose a username'
                                    className='input input-bordered'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

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

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Password</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='Minimum 6 characters'
                                    className='input input-bordered'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-control mb-6'>
                                <label className='label'>
                                    <span className='label-text'>Confirm Password</span>
                                </label>
                                <input
                                    type='password'
                                    placeholder='Re-enter your password'
                                    className='input input-bordered'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button 
                                type='submit' 
                                className='btn btn-primary w-full'
                                disabled={loading}
                            >
                                {loading ? 'Creating account...' : 'Register'}
                            </button>
                        </form>

                        <div className='divider'>OR</div>

                        <p className='text-center text-sm'>
                            Already have an account?{' '}
                            <Link to='/login' className='link link-primary'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
