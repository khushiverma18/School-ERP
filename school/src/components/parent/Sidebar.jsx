import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { 
  Home, User, Calendar, BookOpen, GraduationCap, MessageSquare, 
  CreditCard, FileText, Download, Settings, LogOut, GraduationCap as LogoIcon, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
const navigate = useNavigate();
   
const logout = () => {
  localStorage.removeItem('user');
  navigate('/');
};

  const navigation = [
    { name: 'Dashboard', href: '/parent', icon: Home },
    { name: 'Child Profile', href: '/parent/profile', icon: User },
    { name: 'Attendance', href: '/parent/attendance', icon: Calendar },
    { name: 'Exam Results', href: '/parent/results', icon: GraduationCap },
    { name: 'Homework', href: '/parent/homework', icon: BookOpen },
    { name: 'Study Materials', href: '/parent/materials', icon: Download },
    { name: 'Communication', href: '/parent/communication', icon: MessageSquare },
    { name: 'Deliver', href: '/parent/deliver', icon: FileText },
    { name: 'Fee Payment', href: '/parent/fees', icon: CreditCard },
    { name: 'Reports', href: '/parent/reports', icon: FileText },
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-slate-900 border-r border-slate-700 transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LogoIcon className="h-6 w-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-base font-bold text-white">Parent Panel</h1>
              <p className="text-xs text-slate-400">Pragyan AI</p>
            </div>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || (item.href === '/parent' && location.pathname === '/parent/');
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="px-4 py-4 border-t border-slate-700 space-y-2">
        <NavLink
          to="/parent/settings"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50"
        >
          <Settings className="h-5 w-5 text-slate-400 group-hover:text-white" />
          {isOpen && <span>Settings</span>}
        </NavLink>

         <button
      onClick={logout}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-red-500/10"
    >
      <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-400" />
      <span>Logout</span>
    </button>
      </div>
    </div>
  );
};

export default Sidebar;
