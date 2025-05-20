
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-600">BookMyWorkspace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/workspaces" className="text-gray-700 hover:text-brand-600 transition-colors">
            Workspaces
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-brand-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-brand-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="hover:text-brand-600">
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700">
            <Link to="/signup" className="text-white">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t">
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/workspaces" 
              className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              onClick={toggleMenu}
            >
              Workspaces
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-brand-600 transition-colors py-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="outline" className="w-full">
                <Link to="/login" className="w-full" onClick={toggleMenu}>
                  Log In
                </Link>
              </Button>
              <Button className="w-full bg-brand-600 hover:bg-brand-700">
                <Link to="/signup" className="w-full text-white" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
