import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Bell, 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Globe
} from 'lucide-react';

const TeacherSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
      const [showPassword, setShowPassword] = useState(false);
      const [formData, setFormData] = useState({
        // Profile settings
        parentName: 'Rahul Chaudhary',
        email: 'Rahul@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Maple Street, Springfield',
        emergencyContact: '+1 (555) 987-6543',
        
        // Notification settings
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        gradeUpdates: true,
        attendanceAlerts: true,
        homeworkReminders: true,
        eventNotifications: true,
        
        // Privacy settings
        profileVisibility: 'teachers-only',
        dataSharing: false,
        analyticsTracking: true,
        
        // Security settings
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: false
      });
    
      const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Shield },
        { id: 'security', label: 'Security', icon: Shield }
      ];
    
      const handleInputChange = (field, value) => {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      };
    
      const handleSave = (section) => {
        alert(`${section} settings saved successfully!`);
      };
    

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => handleInputChange('parentName', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSave('Profile')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Delivery Methods</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={formData.emailNotifications}
                          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Email Notifications</span>
                      </label>
                      
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={formData.smsNotifications}
                          onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <Smartphone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">SMS Notifications</span>
                      </label>
                      
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={formData.pushNotifications}
                          onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <Bell className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Push Notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Grade Updates</span>
                        <input
                          type="checkbox"
                          checked={formData.gradeUpdates}
                          onChange={(e) => handleInputChange('gradeUpdates', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Attendance Alerts</span>
                        <input
                          type="checkbox"
                          checked={formData.attendanceAlerts}
                          onChange={(e) => handleInputChange('attendanceAlerts', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Homework Reminders</span>
                        <input
                          type="checkbox"
                          checked={formData.homeworkReminders}
                          onChange={(e) => handleInputChange('homeworkReminders', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Event Notifications</span>
                        <input
                          type="checkbox"
                          checked={formData.eventNotifications}
                          onChange={(e) => handleInputChange('eventNotifications', e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSave('Notification')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={formData.profileVisibility}
                      onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="teachers-only">Teachers Only</option>
                      <option value="school-staff">All School Staff</option>
                      <option value="private">Private</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Control who can view your profile information
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-700 font-medium">Data Sharing</span>
                        <p className="text-sm text-gray-500">Allow sharing of anonymized data for educational research</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.dataSharing}
                        onChange={(e) => handleInputChange('dataSharing', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-700 font-medium">Analytics Tracking</span>
                        <p className="text-sm text-gray-500">Help improve the platform with usage analytics</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.analyticsTracking}
                        onChange={(e) => handleInputChange('analyticsTracking', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => handleSave('Privacy')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                    <label className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-700">Enable Two-Factor Authentication</span>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.twoFactorAuth}
                        onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => handleSave('Security')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Update Security Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
