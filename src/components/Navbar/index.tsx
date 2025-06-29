import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Force update - navbar should be visible with professional styling
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/activities', label: 'Activities' },
    { path: '/stays', label: 'Venues' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/98 backdrop-blur-2xl shadow-lg border-b border-gray-100' 
          : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo Section - Professional */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300 bg-white shadow-sm">
                <img 
                  src="/images/trebound-favicon-32px.jpg" 
                  alt="Trebound Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                  scrolled ? 'text-slate-800' : 'text-slate-800'
                }`}>
                  Trebound
                </span>
                <span className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-slate-600' : 'text-slate-600'
                }`}>
                  CORPORATE EXPERIENCES 
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Professional */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 relative ${
                    isActive(link.path)
                      ? scrolled
                        ? 'text-slate-800 bg-slate-100'
                        : 'text-slate-800 bg-slate-100'
                      : scrolled
                        ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      scrolled ? 'bg-slate-800' : 'bg-slate-800'
                    }`} />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Section - Professional */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:+19173103193" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  scrolled 
                    ? 'text-slate-600 hover:text-slate-800 hover:bg-slate-50' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 917-310-3193</span>
              </a>
              <button className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-sm hover:shadow-md">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button - Professional */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2.5 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? 'text-slate-600 hover:bg-slate-100' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-1' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-current mt-1 transform transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-1' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Professional */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/98 backdrop-blur-2xl border-t border-gray-100 shadow-xl">
            <div className="max-w-7xl mx-auto px-6 py-6">
              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center px-4 py-3 rounded-lg font-medium text-base transition-all duration-300 ${
                      isActive(link.path)
                        ? 'bg-slate-100 text-slate-800'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Section */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <a 
                  href="tel:+19173103193" 
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-50 text-slate-600 rounded-lg font-medium hover:bg-slate-100 hover:text-slate-800 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 917-310-3193</span>
                </a>
                <button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-3 rounded-lg font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-sm">
                  Get Started
                </button>
              </div>

              {/* Mobile Additional Info */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-slate-600 text-sm mb-3">
                  Trusted by 500+ companies worldwide
                </p>
                <div className="flex justify-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Free Consultation</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>24hr Response</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar Spacer */}
      <div className="h-16 lg:h-18"></div>
    </>
  );
};

export default Navbar;
