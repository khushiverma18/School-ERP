import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, LogIn } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import AdmissionForm from './admission';
import LoginModal from './LoginCard';
const Footer = () => {
  const [isAdmissionFormOpen, setIsAdmissionFormOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

   const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-[#0a0a23] via-[#1c0449] to-[#0a0a23] text-white py-16 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 border border-purple-500 rounded-2xl backdrop-blur-md bg-white/5 shadow-lg">
          <div className="grid md:grid-cols-3 gap-10 py-10 px-6 text-sm text-gray-200">

            {/* Brand */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3">
                  <span className="text-3xl">📘</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Pragyan AI</h2>
                  <p className="text-xs text-blue-200">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">Empowering education through innovative technology solutions.</p>
              <div className="flex space-x-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                  <div key={idx} className="bg-blue-600/30 p-2 rounded-full hover:bg-blue-600/60 transition duration-300">
                    <Icon className="text-blue-300 w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col justify-between">
  <div>
    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
    <ul className="space-y-3">
      {['About Us', 'Academics', 'Faculty', 'Events', 'News'].map((item) => (
        <li key={item}>
          <a
            href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
            className="hover:text-white transition"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>

  {/* Button container */}
  <div className="mt-6 flex flex-row gap-4">
    <button
      onClick={() => setIsAdmissionFormOpen(true)}
      className="py-2 px-6 rounded-xl text-white font-semibold border border-purple-400 bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:scale-105 transition-all duration-300"
    >
      Apply Now
    </button>

    <button
      onClick={openLoginModal}
      className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#d63384] via-[#a84fdc] to-[#6610f2] text-white font-semibold rounded-xl shadow-md hover:from-[#c52d78] hover:to-[#541ec4] transition-all duration-300 transform hover:scale-105"
    >
      <LogIn className="h-5 w-5" />
      <span>Login</span>
    </button>
  </div>
</div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-purple-400 w-4 h-4 mt-1" />
                  <span>123 Education Street, Learning City, LC 12345</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="text-purple-400 w-4 h-4 mt-1" />
                  <span>+91 8228884343</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="text-purple-400 w-4 h-4 mt-1" />
                  <span>mqeoperation@gmail.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="text-purple-400 w-4 h-4 mt-1" />
                  <span>
                    <strong>Mon – Fri:</strong> 8:00AM - 5PM<br />
                    <strong>Sat:</strong> 9:00AM - 2:00PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-purple-900/30 mt-6 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center px-6">
            <p>© 2024 Pragyan AI. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Neon Glow Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-200"></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-400"></div>
        </div>
      </footer>

      <AdmissionForm isOpen={isAdmissionFormOpen} onClose={() => setIsAdmissionFormOpen(false)} />
         <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Footer;
