import React from 'react';

const Header = ({ searchTerm, onSearch }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-white tracking-wider drop-shadow-md">
          Movie Review App
        </h1>
      </div>
    </header>
  );
};

export default Header;