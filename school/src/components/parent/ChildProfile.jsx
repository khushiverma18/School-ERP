import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap,
  Users,
  Star,
  Award,
  TrendingUp,
  Download
} from 'lucide-react';

const ChildProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const childData = {
    name: 'Khushi Verma',
    rollNo: 'STU001',
    class: 'Grade 10',
    section: 'A',
    admissionNo: 'ADM2023001',
    dateOfBirth: 'March 15, 2009',
    bloodGroup: 'A+',
    address: '123 Maple Street, Springfield, USA',
    parentName: 'Jitender Verma',
    parentEmail: 'Jitender@email.com',
    parentPhone: '+1 (555) 123-4567',
    emergencyContact: '+1 (555) 987-6543',
    photo: 'https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const academicHistory = [
    { year: '2024', grade: 'Grade 10', percentage: '92.5%', rank: '5th', status: 'Current' },
    { year: '2023', grade: 'Grade 9', percentage: '89.2%', rank: '8th', status: 'Completed' },
    { year: '2022', grade: 'Grade 8', percentage: '91.8%', rank: '3rd', status: 'Completed' },
    { year: '2021', grade: 'Grade 7', percentage: '88.5%', rank: '12th', status: 'Completed' }
  ];

  const subjects = [
    { name: 'Mathematics', teacher: 'Dr. Smith', grade: 'A', percentage: '95%' },
    { name: 'Science', teacher: 'Ms. Johnson', grade: 'A-', percentage: '92%' },
    { name: 'English', teacher: 'Mr. Brown', grade: 'B+', percentage: '88%' },
    { name: 'History', teacher: 'Ms. Davis', grade: 'A', percentage: '94%' },
    { name: 'Geography', teacher: 'Mr. Wilson', grade: 'B+', percentage: '87%' },
    { name: 'Physical Education', teacher: 'Coach Taylor', grade: 'A', percentage: '96%' }
  ];

  const achievements = [
    { title: 'Science Fair Winner', date: 'November 2024', description: 'First place in school science fair' },
    { title: 'Math Olympiad', date: 'October 2024', description: 'Regional level participant' },
    { title: 'Student of the Month', date: 'September 2024', description: 'Outstanding academic performance' },
    { title: 'Debate Competition', date: 'August 2024', description: 'Second place in inter-school debate' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'academic', label: 'Academic History', icon: GraduationCap },
    { id: 'subjects', label: 'Current Subjects', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-6">
          <img
            src={childData.photo}
            alt={childData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{childData.name}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Roll No:</span>
                <p className="font-medium">{childData.rollNo}</p>
              </div>
              <div>
                <span className="text-gray-500">Class:</span>
                <p className="font-medium">{childData.class}</p>
              </div>
              <div>
                <span className="text-gray-500">Section:</span>
                <p className="font-medium">{childData.section}</p>
              </div>
              <div>
                <span className="text-gray-500">Admission No:</span>
                <p className="font-medium">{childData.admissionNo}</p>
              </div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="h-4 w-4" />
            Download Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-500 text-sm">Date of Birth</span>
                      <p className="font-medium">{childData.dateOfBirth}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-500 text-sm">Blood Group</span>
                      <p className="font-medium">{childData.bloodGroup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <span className="text-gray-500 text-sm">Address</span>
                      <p className="font-medium">{childData.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Parent/Guardian Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-500 text-sm">Parent Name</span>
                      <p className="font-medium">{childData.parentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-500 text-sm">Email</span>
                      <p className="font-medium">{childData.parentEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-500 text-sm">Phone</span>
                      <p className="font-medium">{childData.parentPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-gray-500 text-sm">Emergency Contact</span>
                      <p className="font-medium">{childData.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Academic Performance History</h3>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Academic Year</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Grade</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Percentage</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Class Rank</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicHistory.map((record, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">{record.year}</td>
                        <td className="py-4 px-4">{record.grade}</td>
                        <td className="py-4 px-4 font-medium text-green-600">{record.percentage}</td>
                        <td className="py-4 px-4">{record.rank}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            record.status === 'Current' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Current Subjects (2024-25)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((subject, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        subject.grade.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {subject.grade}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Teacher: {subject.teacher}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Current Performance</span>
                      <span className="font-medium text-gray-900">{subject.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Awards & Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;