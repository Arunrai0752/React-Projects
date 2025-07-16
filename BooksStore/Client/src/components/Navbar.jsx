import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                        <li>
                            <Link to="/post" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                Add Book
                            </Link>
                        </li>
                        <li>
                            <Link to="/collections" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                                 Library
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-gray-300 hover:text-white transition-all duration-300 hover:underline hover:underline-offset-8 decoration-purple-500 font-medium">
                            About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="border border-purple-600 px-6 py-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-purple-400 hover:from-gray-700 hover:to-gray-800 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                            >
                               Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;