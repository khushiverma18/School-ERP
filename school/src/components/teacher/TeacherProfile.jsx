import React, { useState } from 'react';
import { User, Phone, Mail, School, BookOpen, Users, Edit3, Save, X } from 'lucide-react';


const TeacherProfile = () => {
   const [activeTab, setActiveTab] = useState('overview');
 const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rahul Chaudhary',
    email:  'Rahul@school.edu',
    phone:  '+1 234-567-8900',
    schoolId: 'TCH001',
    assignedClasses:  ['Class 10A', 'Class 9B'],
    subjects:  ['Mathematics', 'Physics'],
    experience: '8 years',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    joiningDate: '2016-08-15',
    department: 'Science & Mathematics'
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // API call would go here
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: 'Sarah Johnson',
      email:  'sarah.johnson@school.edu',
      phone: '+1 234-567-8900',
      schoolId:  'TCH001',
      assignedClasses:  ['Class 10A', 'Class 9B'],
      subjects:  ['Mathematics', 'Physics'],
      experience: '8 years',
      qualification: 'M.Sc. Mathematics, B.Ed.',
      joiningDate: '2016-08-15',
      department: 'Science & Mathematics'
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Teacher Profile</h2>
          <p className="text-gray-600 mt-1">Manage your personal and professional information</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
              />
            ) : (
              <h3 className="text-2xl font-bold text-gray-900">{profileData.name}</h3>
            )}
            <p className="text-gray-600 mt-1">Mathematics & Physics Teacher</p>
            <p className="text-sm text-gray-500 mt-1">Employee ID: {profileData.schoolId}</p>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Contact Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profileData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <School className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profileData.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-green-500" />
              Professional Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Classes</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.assignedClasses.map((className, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-900">{profileData.experience}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{profileData.qualification}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">
                    {new Date(profileData.joiningDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">45</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Classes per Week</p>
              <p className="text-2xl font-bold text-green-900 mt-1">18</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Average Rating</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">4.8/5</p>
            </div>
            <School className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;