import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="w-full h-[100px] bg-gray-500 ">
            <div className="container mx-auto flex justify-between items-center h-full px-4">
                <div className="flex items-center">
                    <img
                        src="Logo.png"
                        alt="Website Logo"
                        className="h-[80px] w-[80px]"
                    />
                    <h1 className='text-2xl text-blue-600'> BooksStore</h1>
                </div>

                <nav className="flex items-center">
                    <ul className="flex space-x-8 items-center">
                        <li>
                            <Link to="/" className="text-white hover:text-amber-300 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/post" className="text-white hover:text-amber-300 transition">
                                Post
                            </Link>
                        </li>

                        <li>
                            <Link to="/collections" className="text-white hover:text-amber-300 transition">
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-white hover:text-amber-300 transition">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="border px-6 py-2 rounded-lg bg-amber-400 hover:bg-amber-500 transition"
                            >
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;