import React, { useState } from 'react';
import { GraduationCap, Phone, Mail, Menu, X, LogIn } from 'lucide-react';
import LoginModal from './LoginCard';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navItems = ['Home', 'About', 'Academics', 'Admissions', 'Contact'];

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-[#6f42c1] via-[#d63384] to-[#6610f2] text-white shadow-2xl relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">✓</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  Pragyan AI
                </h1>
                <p className="text-purple-200 text-sm font-medium">Excellence in Education</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-300 delay-[${index * 100}ms]`}></div>
                </a>
              ))}
            </nav>

            {/* Contact Info & Login */}
            <div className="hidden xl:flex items-center space-x-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-200">Call us</p>
                  <span className="text-sm font-medium">+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-200">Email us</p>
                  <span className="text-sm font-medium">info@edumanage.edu</span>
                </div>
              </div>
              <button
                onClick={openLoginModal}
                className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#d63384] via-[#a84fdc] to-[#6610f2] text-white font-semibold rounded-xl shadow-md hover:from-[#c52d78] hover:to-[#541ec4] transition-all duration-300 transform hover:scale-105"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={openLoginModal}
                className="lg:hidden xl:hidden flex items-center justify-center p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20"
                aria-label="Login"
              >
                <LogIn className="h-6 w-6" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#6610f2]/95 to-[#6f42c1]/95 backdrop-blur-xl border-t border-white/20 z-50">
              <nav className="container mx-auto px-4 py-6">
                <ul className="space-y-4">
                  {navItems.map((item, index) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center space-x-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                          index === 0 ? 'from-pink-400 to-purple-500' :
                          index === 1 ? 'from-purple-400 to-indigo-500' :
                          index === 2 ? 'from-indigo-400 to-blue-500' :
                          index === 3 ? 'from-pink-400 to-fuchsia-500' :
                          'from-purple-500 to-indigo-600'
                        }`}></div>
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-white/20 space-y-4">
                  <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg">
                    <Phone className="h-5 w-5 text-green-400" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-lg">
                    <Mail className="h-5 w-5 text-pink-400" />
                    <span className="text-sm">info@edumanage.edu</span>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header;
