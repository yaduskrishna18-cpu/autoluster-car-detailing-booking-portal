import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Calendar, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { currentUser, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Packages', path: '/#packages' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'Employee', path: '/employee' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-50">
          <img 
            src="/logo.png" 
            alt="Autoluster Logo" 
            className={`h-8 w-auto object-contain ${(!isScrolled && location.pathname === '/' && !isMobileMenuOpen) ? 'invert' : ''}`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className={`hidden text-2xl font-bold tracking-tighter transition-colors ${
            isScrolled || location.pathname !== '/' || isMobileMenuOpen ? 'text-black' : 'text-white'
          }`}>
            AUTOLUSTER
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isHashLink = link.path.startsWith('/#');
            if (isHashLink) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-gray-500 ${
                    isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-gray-200 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-gray-500 ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-gray-200 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <Link
              to={currentUser.role === 'admin' ? '/admin' : currentUser.role === 'employee' ? '/employee' : '/dashboard'}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500 ${
                isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-gray-200 hover:text-white'
              }`}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                <img 
                  src={`https://unavatar.io/${currentUser.email}?fallback=https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden lg:block truncate max-w-[100px]">{currentUser.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-500 ${
                isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-gray-200 hover:text-white'
              }`}
            >
              <User size={18} />
              Login
            </Link>
          )}
          <Link
            to="/booking"
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Calendar size={18} />
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className={isScrolled || location.pathname !== '/' || isMobileMenuOpen ? 'text-black' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled || location.pathname !== '/' ? 'text-black' : 'text-white'} />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 h-screen bg-white flex flex-col items-center justify-center space-y-8 z-40"
            >
              {navLinks.map((link) => {
                const isHashLink = link.path.startsWith('/#');
                if (isHashLink) {
                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-medium text-gray-900"
                    >
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-medium text-gray-900"
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
                {currentUser ? (
                  <Link
                    to={currentUser.role === 'admin' ? '/admin' : currentUser.role === 'employee' ? '/employee' : '/dashboard'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center gap-3 text-lg font-medium text-gray-900 border border-gray-200 py-3 rounded-full"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                      <img 
                        src={`https://unavatar.io/${currentUser.email}?fallback=https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {currentUser.name}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center items-center gap-2 text-lg font-medium text-gray-900 border border-gray-200 py-3 rounded-full"
                  >
                    <User size={20} />
                    Login
                  </Link>
                )}
                <Link
                  to="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-black text-white py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
                >
                  <Calendar size={20} />
                  Book Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
