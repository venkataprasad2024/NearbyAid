// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-gray-900/60 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white tracking-tight"
          onClick={closeMenu}
        >
          NearByAid
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/map" className="text-gray-300 hover:text-white transition-colors">
            Find Help
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-lg shadow-blue-900/30"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-lg bg-gray-900/90 border-b border-gray-700/50">
          <div className="px-6 py-8 flex flex-col space-y-6 text-center">
            <Link 
              to="/" 
              className="text-xl text-gray-200 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className="text-xl text-gray-200 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Find Help
            </Link>
            <Link 
              to="/login" 
              className="text-xl text-gray-200 hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="text-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}