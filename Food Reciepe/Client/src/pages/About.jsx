import React from 'react';
import booksimg from "../assets/Storebooks.jpg";

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Gothic decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-red-900 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-gray-800 rounded-3xl p-8 shadow-xl border border-purple-900/50">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100">
              Welcome to <span className="text-purple-400 font-serif">StoreBooks!</span>
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              This is my first full-stack project combining React, Node.js, Express, and MongoDB. 
              Through building this book store application.
            </p>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-gray-900 p-2 rounded-2xl shadow-xl border border-gray-700 transform transition-all duration-300 hover:scale-120 rotate-9 hover:rotate-0">
              <img 
                src={booksimg}
                alt="Bookstore illustration" 
                className="rounded-xl w-full max-w-md object-cover grayscale-20 contrast-125"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-300 mb-6 font-serif">
            About the Developer
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm Arun Rai, a passionate developer exploring the world of full-stack development. 
            This project represents my journey of learning by building - from setting up the backend 
            services to creating interactive frontend components. Every challenge has been an 
            opportunity to grow and improve my skills.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;