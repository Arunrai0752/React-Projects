import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Log from './Log';
import api from '../config/api';

const Navbar = () => {
    const [logIsOpen, setLogIsOpen] = useState(false);   // Login modal open hai ya nahi
    const [isLoggedIn, setIsLoggedIn] = useState(false); // User logged in hai ya nahi
    const [user, setUser] = useState(null);              // User ka data
    const [loading, setLoading] = useState(true);        // Page load ho raha hai ya nahi

    const navigate = useNavigate();

    const handleLogin = () => {
        setLogIsOpen(true);
    };

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/user/getData");
            if (res.data && res.data.data) {
                setIsLoggedIn(true);
                setUser(res.data.data);
                localStorage.setItem("user", JSON.stringify(res.data.data));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await api.get("/user/logout");
            setIsLoggedIn(false);
            setUser(null);
            navigate('/');
            window.location.reload()
        } catch (error) {
            console.error("Logout failed:", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [logIsOpen]);

    if (loading) {
        return <div className="w-full h-[100px] bg-gray-900"></div>;
    }

    return (
        <header className="w-full h-[100px] bg-gray-900 border-b border-purple-900 shadow-lg">
            <div className="container mx-auto flex justify-between items-center h-full px-4">
                <div className="flex items-center space-x-3">
                    <img
                        src="Logo.png"
                        alt="Nevermore Academy Logo"
                        className="h-[80px] w-[80px] filter invert"
                    />
                    <h1 className='text-2xl font-gothic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500'>
                        StoreBooks
                    </h1>
                </div>

                <nav className="flex items-center">
                    <ul className="flex space-x-8 items-center">
                        <li>
                            <Link to="/" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                Home
                            </Link>
                        </li>
                        {isLoggedIn && (
                            <li>
                                <Link to="/post" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                    Add Book
                                </Link>
                            </li>
                        )}
                        { isLoggedIn ?
                        <li >
                                <Link to="/collections" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                    Library
                                </Link>
                         </li>
                         :
                        <li onClick={()=> {setLogIsOpen(true)}} >
                                <Link  className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                    Library
                                </Link>
                         </li>
                        }


                        {isLoggedIn && (
                            <li>
                                <Link to="/mybooks" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                    My Books
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/about" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                About
                            </Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-purple-300 hidden md:inline">
                                        Welcome, {user?.fullName}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="border border-red-600 px-6 py-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-red-400 hover:from-gray-700 hover:to-gray-800 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="border border-purple-600 px-6 py-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-purple-400 hover:from-gray-700 hover:to-gray-800 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                                >
                                    Login
                                </button>
                            )}
                        </li>
                    </ul>
                </nav>

                <Log
                    isOpen={logIsOpen}
                    onClose={() => setLogIsOpen(false)}
                />
            </div>
        </header>
    );
};

export default Navbar;