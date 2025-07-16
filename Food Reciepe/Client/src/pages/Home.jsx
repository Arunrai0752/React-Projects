import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-amber-50 to-rose-50 overflow-hidden">
           

            <div className="container mx-auto  px-6 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10 ">
                {/* Text Content */}
                <div className="lg:w-1/2 mb-12 lg:mb-0 space-y-8 pr-0 lg:pr-12">
                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                        Welcome Back, <span className="text-rose-600 font-serif italic">Arun Rai</span>!
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light max-w-2xl">
                      Build your book collection, find great reads, and join our community of book lovers.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link 
                            to="/post" 
                            className="px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-rose-700 hover:to-rose-600 transition-all duration-300 text-lg font-medium flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Your Book
                        </Link>
                        <Link 
                            to="/collections" 
                            className="px-8 py-4 border-2 border-amber-600/20 bg-white/50 text-amber-700 rounded-xl hover:bg-amber-50/80 hover:border-amber-600/40 transition-all duration-300 text-lg font-medium flex items-center gap-2 backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Explore Collection
                        </Link>
                    </div>
                </div>

                {/* Image with floating effect */}
                <div className="lg:w-1/2 flex justify-center items-start relative mt-16 lg:mt-0">
                    <div className="relative">
                        <img 
                            src="Adobe Express - file.png" 
                            alt="Books collection illustration" 
                            className="max-w-full h-auto object-contain rounded-2xl  transform transition-all duration-700 hover:scale-105 hover:rotate-1"
                            style={{ maxHeight: '600px', filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))' }}
                        />

                    </div>
                </div>
            </div>

            
            <div className="fixed right-4 bottom-4 text-sm text-gray-500 font-serif italic tracking-wider">
                Crafted with ♥ by Arun Rai
            </div>
        </main>
    );
};

export default Home;