import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosAdd } from "react-icons/io";
import { BsCollection } from "react-icons/bs";



const Home = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
          

            <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
                <div className="lg:w-1/2 mb-12 lg:mb-0 space-y-8 pr-0 lg:pr-12">
                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-gray-100 leading-tight">
                        Welcome Back, <span className="text-purple-400 font-serif italic">Arun Rai</span>!
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-2xl">
                        Build your book collection, find great reads, and join our community of book lovers.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link 
                            to="/post" 
                            className="px-8 py-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-purple-900 hover:to-purple-700 transition-all duration-300 text-lg font-medium flex items-center gap-2"
                        >
                           <IoIosAdd className='text-3xl' />

                            Add Your Book
                        </Link>
                        <Link 
                            to="/collections" 
                            className="px-8 py-4 border-2 border-purple-600/30 bg-gray-800/50 text-purple-300 rounded-xl hover:bg-gray-700/80 hover:border-purple-500/40 transition-all duration-300 text-lg font-medium flex items-center gap-2 backdrop-blur-sm"
                        >
                            <BsCollection className='text-3xl' />

                            Explore Collection
                        </Link>
                    </div>
                </div>

                <div className="lg:w-1/2 flex justify-center items-start relative mt-16 lg:mt-0">
                    <div className="relative">
                        <img 
                            src="Adobe Express - file.png" 
                            alt="Books collection illustration" 
                            className="max-w-full h-auto object-contain rounded-2xl  transform transition-all duration-700 hover:scale-105 hover:rotate-8"
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
        </main>
    );
};

export default Home;