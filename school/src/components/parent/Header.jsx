import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

const Header = ({ toggleSidebar, activeModule }) => {
  const getModuleTitle = (module) => {
    const titles = {
      dashboard: 'Dashboard Overview',
      users: 'User Management',
      timetable: 'Timetable Management',
      attendance: 'Attendance Reports',
      results: 'Exam Results',
      fees: 'Fee Management',
      chat: 'Communication Center',
      events: 'Events Management',
      alumni: 'Alumni Management',
      analytics: 'Analytics & Reports'
    };
    return titles[module] || 'Admin Dashboard';
  };

  return (
    <header className="bg-[#1e2139] shadow-sm border-b border-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{getModuleTitle(activeModule)}</h1>
            <p className="text-sm text-white">Welcome back</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">Parent</p>
              <p className="text-xs text-white">Parent Panel</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
