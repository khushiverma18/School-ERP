// components/LoginModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authAPI} from '../services/api';

import { User, GraduationCap, BookOpen, Shield, X, LogIn } from 'lucide-react';
  // ];

  const LoginModal = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Access your courses, grades, and assignments',
      color: 'from-blue-500 to-blue-600',
      hoverBorderColor: 'hover:border-blue-500'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: BookOpen,
      description: 'Manage classes, assignments, and student progress',
      color: 'from-green-500 to-green-600',
      hoverBorderColor: 'hover:border-green-500'
    },
    {
      id: 'parent',
      title: 'Parent',
      icon: User,
      description: 'Monitor your child\'s academic progress',
      color: 'from-purple-500 to-purple-600',
      hoverBorderColor: 'hover:border-purple-500'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Shield,
      description: 'System administration and management',
      color: 'from-red-500 to-red-600',
      hoverBorderColor: 'hover:border-red-500'
    }
  ];
  const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.login({
        email: credentials.username,
        password: credentials.password,
      });

      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);

      // Axios default header for auth (optional)
      // If you exported `api` instance from authAPI.js
      // import api from '../api/authAPI';
      // api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

      switch (user.role) {
        case 'student': return navigate('/student');
        case 'teacher': return navigate('/teacher');
        case 'parent':  return navigate('/parent');
        case 'admin':   return navigate('/admin');
        default:        return navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  if (!isOpen) return null;

  if (!isOpen) return null;


  const selectedRoleDetails = roles.find((r) => r.id === selectedRole);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
      <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 rounded-xl shadow-2xl w-full max-w-3xl relative border border-slate-700/50">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-slate-700/50 z-10"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white p-6 md:p-8 text-center rounded-t-xl">
          <div className="flex justify-center items-center gap-3 mb-2">
            <LogIn size={30} className="opacity-90"/>
            <h2 className="text-2xl md:text-3xl font-bold">Pragyan AI Login</h2>
          </div>
          <p className="text-purple-200 text-sm">
            {selectedRole ? `Logging in as ${selectedRoleDetails?.title}` : 'Please select your role to continue'}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          {!selectedRole ? (
            // Role Selection View
            <div>
              <h3 className="text-xl font-semibold text-center mb-6 text-slate-100">Select Your Role</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`cursor-pointer group p-0.5 rounded-xl bg-gradient-to-br ${role.color} hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]`}
                    >
                      <div className="bg-slate-800 rounded-[10px] p-5 h-full flex flex-col items-center text-center border border-transparent group-hover:bg-slate-800/80 transition-colors duration-300">
                        <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${role.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-xl font-semibold mb-1 text-slate-100">{role.title}</h4>
                        <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{role.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Login Form View
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {(() => {
                    const IconComponent = selectedRoleDetails?.icon || User;
                    return (
                      <>
                        <div className={`w-12 h-12 bg-gradient-to-r ${selectedRoleDetails?.color} rounded-full flex items-center justify-center shadow-md`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-100">{selectedRoleDetails?.title} Login</h3>
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={() => setSelectedRole('')}
                  className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                >
                  ← Change Role
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label htmlFor={`username-${selectedRole}`} className="block text-sm font-medium text-slate-300 mb-1.5">Username or Email</label>
                  <input
                    id={`username-${selectedRole}`} // Unique ID based on role to help with autofill if roles change
                    type="text"
                    placeholder="e.g., yourname or user@example.com"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                    className="w-full bg-slate-700/80 border border-slate-600/70 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-slate-500 transition-all duration-150"
                  />
                </div>
                <div>
                  <label htmlFor={`password-${selectedRole}`} className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                  <input
                    id={`password-${selectedRole}`}
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    className="w-full bg-slate-700/80 border border-slate-600/70 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-slate-500 transition-all duration-150"
                  />
                </div>
                <div className="flex items-center justify-between text-sm pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer hover:text-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-purple-500 bg-slate-600 border-slate-500 rounded focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">Forgot password?</a>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold py-3.5 rounded-lg hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-800/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-100 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;