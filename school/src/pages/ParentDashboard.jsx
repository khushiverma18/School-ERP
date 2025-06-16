import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/parent/Sidebar';
import Header from '../components/parent/Header';


const ParentDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeModule={activeModule}
        />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
