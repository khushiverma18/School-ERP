import React, { useState } from 'react';
import {
  User, Bell, Shield, KeyRound, Save, Mail, Phone, Building2, Eye, EyeOff, Users, Settings
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

   const [activeModule, setActiveModule] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    // Profile
    adminName: 'Admin Sharma',
    email: 'admin@school.com',
    phone: '+91 99999 12345',
    department: 'Administration',

    // Notifications
    systemAlerts: true,
    userActivityAlerts: false,
    emailUpdates: true,

    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: true,

    // Privacy
    allowDataExport: false,
    auditLogsEnabled: true,
  });

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: KeyRound },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (section) => {
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600">Control your administrative preferences and access levels</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Admin Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => handleInputChange('adminName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSave('Profile')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'System Alerts', key: 'systemAlerts' },
                  { label: 'User Activity Alerts', key: 'userActivityAlerts' },
                  { label: 'Email Updates', key: 'emailUpdates' }
                ].map(item => (
                  <label key={item.key} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={formData[item.key]}
                      onChange={(e) => handleInputChange(item.key, e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={() => handleSave('Notifications')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Notifications
              </button>
            </div>
          )}

          {/* Privacy */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Preferences</h3>
              <div className="space-y-4">
                <label className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-700 font-medium">Allow Data Export</span>
                    <p className="text-sm text-gray-500">Let admins export system data</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.allowDataExport}
                    onChange={(e) => handleInputChange('allowDataExport', e.target.checked)}
                    className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>

                <label className="flex justify-between items-start">
                  <div>
                    <span className="text-gray-700 font-medium">Enable Audit Logs</span>
                    <p className="text-sm text-gray-500">Track activity for compliance</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.auditLogsEnabled}
                    onChange={(e) => handleInputChange('auditLogsEnabled', e.target.checked)}
                    className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
              </div>

              <button
                onClick={() => handleSave('Privacy')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Privacy Settings
              </button>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
              <div className="space-y-4">
                {/* Password Fields */}
                {['currentPassword', 'newPassword', 'confirmPassword'].map((field, idx) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field === 'currentPassword'
                        ? 'Current Password'
                        : field === 'newPassword'
                        ? 'New Password'
                        : 'Confirm Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={field === 'currentPassword' && showPassword ? 'text' : 'password'}
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {field === 'currentPassword' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* 2FA */}
                <label className="flex justify-between items-center mt-4">
                  <div>
                    <span className="text-gray-700">Enable Two-Factor Authentication</span>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.twoFactorAuth}
                    onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>

                <button
                  onClick={() => handleSave('Security')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Update Security
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
