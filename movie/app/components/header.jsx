import React from 'react';

const Header = ({ searchTerm, onSearch }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-white tracking-wider drop-shadow-md">
          Movie Review App
        </h1>
        <div className="w-full md:w-96">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchTerm}
              onChange={onSearch}
              className="w-full px-4 py-2 rounded-full 
                bg-white/20 text-white 
                placeholder-white/70 
                focus:outline-none 
                focus:ring-2 focus:ring-white/40 
                transition duration-300 
                border border-white/30"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;