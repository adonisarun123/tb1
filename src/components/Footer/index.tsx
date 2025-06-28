import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Activities', path: '/activities' },
    { name: 'Venues & Stays', path: '/stays' },
    { name: 'Virtual Events', path: '/virtual-team-building' },
    { name: 'Corporate Offsite', path: '/corporate-team-offsite' },
    { name: 'Team Building Games', path: '/team-building-games' },
  ];

  const destinations = [
    { name: 'Bangalore', path: '/corporate-team-outing-places-bangalore' },
    { name: 'Mumbai', path: '/corporate-team-outing-mumbai' },
    { name: 'Hyderabad', path: '/team-outing-places-hyderabad' },
    { name: 'Virtual Events', path: '/virtual-team-building' },
  ];

  const company = [
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/jobs' },
    { name: 'Contact', path: '/contact' },
  ];

  const legal = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white font-black text-2xl">T</span>
                </div>
                <span className="text-3xl font-black tracking-tight">Trebound</span>
              </Link>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-md">
              Creating unforgettable team experiences that strengthen bonds, boost morale, and drive business success.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Call us anytime</p>
                  <a href="tel:+19173103193" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
                    +1 917-310-3193
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email us</p>
                  <a href="mailto:hello@trebound.com" className="text-xl font-bold text-white hover:text-emerald-400 transition-colors">
                    hello@trebound.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-blue-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">💼</span>
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">📍</span>
              Destinations
            </h3>
            <ul className="space-y-4">
              {destinations.map((destination) => (
                <li key={destination.path}>
                  <Link 
                    to={destination.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors"></span>
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">🏢</span>
              Company
            </h3>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:bg-purple-400 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal Links */}
            <div className="pt-6 border-t border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-3 group-hover:bg-gray-300 transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Team Building Trends
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Get exclusive insights, new activity launches, and expert tips delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Subscribe
                </button>
              </div>
              
              <p className="text-gray-400 text-sm mt-4">
                Join 10,000+ HR professionals and team leaders
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">500+</div>
              <div className="text-gray-400 font-medium">Companies Served</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">350+</div>
              <div className="text-gray-400 font-medium">Unique Activities</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">50K+</div>
              <div className="text-gray-400 font-medium">Happy Participants</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">4.9★</div>
              <div className="text-gray-400 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} Trebound. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Available 24/7</span>
                </span>
                <span>|</span>
                <span>ISO 27001 Certified</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>🌟</span>
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>🏆</span>
                <span>Award Winning Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
