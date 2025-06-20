import { 
  Home, User, Calendar, BookOpen, MessageSquare, 
  FileText, Download, Settings, LogOut, GraduationCap as LogoIcon, 
  ChevronLeft, Upload, ChevronRight, BarChart3 , Gamepad2
} from 'lucide-react';
import { NavLink, useLocation ,useNavigate} from "react-router-dom";


export function StudentSidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate(); 

     const logout = () => {
  localStorage.removeItem('user');
  navigate('/');
};
 
  const menuItems = [
    { title: "Dashboard", icon: Home, url: "/student" },
    { title: "Profile", icon: User, url: "/student/profile" },
    { title: "Timetable", icon: Calendar, url: "/student/timetable" },
    { title: "Attendance", icon: BarChart3, url: "/student/attendance" },
    { title: "Exam Results", icon: FileText, url: "/student/results" },
    { title: "Assignments", icon: Upload, url: "/student/assignments" },
    { title: "Study Materials", icon: BookOpen, url: "/student/materials" },
    { title: "Communication", icon: MessageSquare, url: "/student/communication" },
     { title: "Game", icon:  Gamepad2, url: "/student/Game" },
  ];

  const location = useLocation();

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#1e2139] text-white transition-all duration-300 z-30 shadow-2xl ${isOpen ? 'w-64' : 'w-16'}`}>
      
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LogoIcon className="h-6 w-6 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-base font-bold text-white">Student Panel</h1>
              <p className="text-xs text-slate-400">Pragyan AI</p>
            </div>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.url || (item.url === '/student' && location.pathname === '/student/');
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              {isOpen && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="px-4 py-4 border-t border-slate-700 space-y-2">
        <NavLink
          to="/student/settings"
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
}
