// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-fedex-purple text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            latrix delivery
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-fedex-purple/80 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/products" className="hover:text-gray-300 transition-colors font-medium">
              Products
            </Link>
            <Link to="/tracking" className="hover:text-gray-300 transition-colors font-medium">
              Tracking
            </Link>
            <Link to="/locations" className="hover:text-gray-300 transition-colors font-medium">
              Locations
            </Link>
            <Link to="/support" className="hover:text-gray-300 transition-colors font-medium">
              Support
            </Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="p-2 hover:bg-fedex-purple/80 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-fedex-purple/80 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-fedex-purple/80 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed inset-0 bg-fedex-purple z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <Link to="/" className="text-2xl font-bold" onClick={toggleMenu}>
                latrix delivery
              </Link>
              <button 
                onClick={toggleMenu}
                className="p-2 hover:bg-fedex-purple/80 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center justify-center flex-grow space-y-8 p-4">
              <Link 
                to="/products" 
                className="text-xl font-medium hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link 
                to="/tracking" 
                className="text-xl font-medium hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Tracking
              </Link>
              <Link 
                to="/locations" 
                className="text-xl font-medium hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Locations
              </Link>
              <Link 
                to="/support" 
                className="text-xl font-medium hover:text-gray-300 transition-colors"
                onClick={toggleMenu}
              >
                Support
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex justify-center space-x-8 p-6 border-t border-white/10">
              <button className="p-2 hover:bg-fedex-purple/80 rounded-full transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-fedex-purple/80 rounded-full transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </button>
              <button className="p-2 hover:bg-fedex-purple/80 rounded-full transition-colors">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;