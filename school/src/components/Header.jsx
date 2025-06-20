import React, { useState, useEffect } from 'react';
import { GraduationCap, Phone, Mail, Menu, X, LogIn } from 'lucide-react';
import LoginModal from './LoginCard';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items with corresponding section IDs
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'Ecosystem', id: 'ecosystem' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Scroll to section and close mobile menu
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-[#6f42c1] via-[#d63384] to-[#6610f2] shadow-xl py-2' 
            : 'bg-gradient-to-r from-[#6f42c1] via-[#d63384] to-[#6610f2] py-4'
        }`}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] sm:text-xs font-bold text-white">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  Pragyan AI
                </h1>
                <p className="text-purple-200 text-[10px] sm:text-xs md:text-sm font-medium">Excellence in Education</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-3 py-1.5 text-white/90 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10 text-sm xl:text-base">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 delay-[${index * 100}ms]`}></div>
                </button>
              ))}
            </nav>

            {/* Contact Info & Login */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
              <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-7 h-7 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Phone className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-purple-200">Call us</p>
                  <span className="text-xs font-medium">+91 8228884343</span>
                </div>
              </div>
              <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                  <img src="/mytho-logo.png" alt="Mytho Logo" className='w-6 h-6 object-contain' />
                </div>
                <div>
                  <p className="text-[10px] text-purple-200">Email us</p>
                  <span className="text-xs font-medium">mqeoperation@gmail.com</span>
                </div>
              </div>
              <button
                onClick={openLoginModal}
                className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-[#d63384] via-[#a84fdc] to-[#6610f2] text-white font-semibold rounded-lg xl:rounded-xl shadow-md hover:from-[#c52d78] hover:to-[#541ec4] transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Login</span>
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={openLoginModal}
                className="lg:hidden flex items-center justify-center p-1.5 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20"
                aria-label="Login"
              >
                <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-gradient-to-b from-[#6610f2]/95 to-[#6f42c1]/95 backdrop-blur-xl z-50 pt-16">
            <div className="container mx-auto px-4 py-6">
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center space-x-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                        index === 0 ? 'from-pink-400 to-purple-500' :
                        index === 1 ? 'from-purple-400 to-indigo-500' :
                        index === 2 ? 'from-indigo-400 to-blue-500' :
                        index === 3 ? 'from-pink-400 to-fuchsia-500' :
                        'from-purple-500 to-indigo-600'
                      }`}></div>
                      <span className="text-lg">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-white/20 space-y-4">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-base">+91 8228884343</span>
                </div>
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center">
                    <img src="/mytho-logo.png" alt="Mytho Logo" className='w-5 h-5 object-contain' />
                  </div>
                  <span className="text-base">mqeoperation@gmail.com</span>
                </div>
                <button
                  onClick={openLoginModal}
                  className="w-full flex items-center justify-center space-x-2 mt-4 px-5 py-3 bg-gradient-to-r from-[#d63384] via-[#a84fdc] to-[#6610f2] text-white font-semibold rounded-xl shadow-md hover:from-[#c52d78] hover:to-[#541ec4] transition-all duration-300"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login to Account</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className={isScrolled ? "h-16" : "h-20"}></div>
    </>
  );
};

export default Header;