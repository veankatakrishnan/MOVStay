import React from 'react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mt-2">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              className="h-10 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105" 
              src="/MOV Stay Logo.png" 
              alt="MOV Stay Logo" 
            />
          </div>

          {/* Navigation Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <button className="text-[#475569] hover:text-[#0D9488] font-bold px-4 py-2 transition-colors duration-200">
              Login
            </button>
            <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold px-6 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-[1px]">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
