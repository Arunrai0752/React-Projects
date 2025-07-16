import React from 'react';
import booksimg from "../assets/Storebooks.jpg"

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-amber-400 rounded-3xl p-8 shadow-lg">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Welcome to <span className="text-white">BookStore</span>
            </h1>
            
            <p className="text-lg text-gray-800 leading-relaxed">
              This is my first full-stack project combining React, Node.js, Express, and MongoDB. 
              Through building this book store application, I'm developing my skills in:
            </p>
            
           
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <div className="bg-white p-2 rounded-2xl shadow-xl">
              <img 
                src={booksimg}
                alt="Bookstore illustration" 
                className="rounded-xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            About the Developer
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
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