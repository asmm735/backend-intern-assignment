import { PlusIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { Link } from 'react-router'
import React from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return <header className="bg-base-300 border-b border-base-content/10">
    <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
            <Link to="/" className='text-3xl font-bold text-primary font-mono tracking-tight'> 
                ThinkBoard
            </Link>
            <div className='flex items-center gap-4'>
                {isAuthenticated ? (
                    <>
                        <div className='flex items-center gap-2'>
                            <UserIcon className='size-4' />
                            <span className='text-sm font-medium'>{user?.username}</span>
                            {user?.role === 'admin' && (
                                <span className='badge badge-primary badge-sm'>Admin</span>
                            )}
                        </div>
                        <Link to={"/create"} className='btn btn-primary btn-sm'>
                            <PlusIcon className='size-4'/>
                            <span>New Note</span>
                        </Link>
                        <button onClick={logout} className='btn btn-ghost btn-sm'>
                            <LogOutIcon className='size-4'/>
                            <span>Logout</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='btn btn-ghost btn-sm'>
                            Login
                        </Link>
                        <Link to="/register" className='btn btn-primary btn-sm'>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    </div>
  </header>
}

export default Navbar