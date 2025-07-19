import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { BsCollection } from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../config/api';
import Log from '../components/Log';


const Home = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        occupation: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [AccountCreate , setAccountCreate] = useState(false)

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const res = await api.get("/user/getData");
            console.log(res)

            setUserData(res.data.data);
            toast.success("User data loaded successfully!");
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error(
                error.response?.data?.message ||
                `Error: ${error.message || "Failed to fetch user data"}`
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleSignUp =() => {
        setAccountCreate(true)
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-2xl">Loading your data...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
            <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
                <div className="lg:w-1/2 mb-12 lg:mb-0 space-y-8 pr-0 lg:pr-12">
                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-gray-100 leading-tight">
                        Welcome {userData.fullName}, <span className="text-purple-400 font-serif italic">to Storebook</span>!
                    </h1>
                    <h2 className="flex gap-3 text-2xl text-purple-300">
                        Read As A <p className='text-blue-600'> {userData.occupation || "Book Lover"}</p>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-2xl">
                        Build your book collection, find great reads, and join our community of book lovers.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        {userData.email ? 
                        <Link
                            to="/post"
                            className="px-8 py-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-purple-900 hover:to-purple-700 transition-all duration-300 text-lg font-medium flex items-center gap-2"
                        >
                            <IoIosAdd className='text-3xl' />
                            Add Your Book
                        </Link> : 
                        <button
                           onClick={handleSignUp}
                            className="px-8 py-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-purple-900 hover:to-purple-700 transition-all duration-300 text-lg font-medium flex items-center gap-2"
                        >
                            <IoIosAdd className='text-3xl' />
                            Create A new Account
                        </button>}
                       {userData.email?  <Link
                            to="/collections"
                            className="px-8 py-4 border-2 border-purple-600/30 bg-gray-800/50 text-purple-300 rounded-xl hover:bg-gray-700/80 hover:border-purple-500/40 transition-all duration-300 text-lg font-medium flex items-center gap-2 backdrop-blur-sm"
                        >
                            <BsCollection className='text-3xl' />
                            Explore Collection
                        </Link>:
                         <Link
                            onClick={()=>{setAccountCreate(true)}}
                            className="px-8 py-4 border-2 border-purple-600/30 bg-gray-800/50 text-purple-300 rounded-xl hover:bg-gray-700/80 hover:border-purple-500/40 transition-all duration-300 text-lg font-medium flex items-center gap-2 backdrop-blur-sm"
                        >
                            <BsCollection className='text-3xl' />
                            Explore Collection
                        </Link>}
                    </div>
                </div>

                <div className="lg:w-1/2 flex justify-center items-start relative mt-16 lg:mt-0">
                    <div className="relative">
                        <img
                            src="Adobe Express - file.png"
                            alt="Books collection illustration"
                            className="max-w-full h-auto object-contain rounded-2xl transform transition-all duration-700 hover:scale-105 hover:rotate-8"
                            style={{
                                maxHeight: '600px',
                                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.3)) grayscale(20%)'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="fixed right-4 bottom-4 text-sm text-purple-400 font-serif italic tracking-wider">
                Crafted with <span className="text-red-500">♥</span> by Arun Rai
            </div>

            <Log
            isOpen={AccountCreate}
            onClose={() => setAccountCreate(false)}
            defaultSignUp={true}
            

            />
        </main>
    );
};

export default Home;