import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../components/admin/Admin.Sidebar';
import AdminHeader from '../components/admin/AdminHeader';


const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);


  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AdminHeader 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeModule={activeModule}
        />
        
        <main className=" p-6 ">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
