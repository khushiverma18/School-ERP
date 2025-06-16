import React, { useState } from 'react';
import { Users, Search, Filter, Eye, Edit3, BarChart3, Calendar, Award, BookOpen } from 'lucide-react';
import { mockData } from '../../services/api';

const StudentOverview = () => {
  const [students, setStudents] = useState(mockData.students);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // list, details

  const classes = ['Class 10A', 'Class 9B'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.includes(searchTerm);
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Overview</h2>
          <p className="text-gray-600 mt-1">Manage and view detailed information about your students</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Student List
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{students.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">High Performers</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {students.filter(s => s.averageGrade.startsWith('A')).length}
              </p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Average Attendance</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">
                {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Classes</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {new Set(students.map(s => s.class)).size}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {viewMode === 'list' && (
        <>
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Class</label>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Classes</option>
                  {classes.map(className => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterClass('all');
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Students ({filteredStudents.length})</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">Roll No: {student.rollNumber} • {student.class}</p>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className={`text-lg font-bold ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </p>
                          <p className="text-xs text-gray-600">Attendance</p>
                        </div>

                        <div className="text-center">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getGradeColor(student.averageGrade)}`}>
                            {student.averageGrade}
                          </span>
                          <p className="text-xs text-gray-600 mt-1">Grade</p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setViewMode('details');
                            }}
                            className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="bg-purple-100 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Parent: </span>
                        <span className="font-medium text-gray-900">{student.parentName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone: </span>
                        <span className="font-medium text-gray-900">{student.parentPhone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Updated: </span>
                        <span className="font-medium text-gray-900">2 days ago</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No students found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'details' && selectedStudent && (
        <StudentDetails 
          student={selectedStudent} 
          onBack={() => setViewMode('list')}
        />
      )}
    </div>
  );
};

// Student Details Component
const StudentDetails = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'results', label: 'Results', icon: Award },
    { id: 'homework', label: 'Homework', icon: BookOpen }
  ];

  // Mock detailed data
  const attendanceData = [
    { date: '2024-01-10', status: 'present' },
    { date: '2024-01-09', status: 'present' },
    { date: '2024-01-08', status: 'absent' },
    { date: '2024-01-05', status: 'present' },
    { date: '2024-01-04', status: 'late' }
  ];

  const resultsData = [
    { subject: 'Mathematics', exam: 'Mid-term', marks: 85, totalMarks: 100, grade: 'A' },
    { subject: 'Physics', exam: 'Unit Test', marks: 78, totalMarks: 100, grade: 'B+' },
    { subject: 'Chemistry', exam: 'Quiz', marks: 92, totalMarks: 100, grade: 'A+' }
  ];

  const homeworkData = [
    { title: 'Algebra Practice', subject: 'Mathematics', dueDate: '2024-01-15', status: 'submitted', grade: 'A' },
    { title: 'Physics Lab Report', subject: 'Physics', dueDate: '2024-01-18', status: 'pending', grade: null },
    { title: 'Chemical Equations', subject: 'Chemistry', dueDate: '2024-01-12', status: 'submitted', grade: 'B+' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to List
            </button>
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-white">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
              <p className="text-gray-600">Roll No: {student.rollNumber} • {student.class}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Personal Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Roll Number:</span>
                    <span className="font-medium">{student.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-medium">{student.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{student.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Parent Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parent Name:</span>
                    <span className="font-medium">{student.parentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{student.parentPhone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">Current Attendance</h5>
                <p className="text-2xl font-bold text-blue-600">{student.attendance}%</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">Average Grade</h5>
                <p className="text-2xl font-bold text-green-600">{student.averageGrade}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Recent Attendance</h4>
            <div className="space-y-3">
              {attendanceData.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium">{new Date(record.date).toLocaleDateString()}</span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Exam Results</h4>
            <div className="space-y-3">
              {resultsData.map((result, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{result.subject}</p>
                      <p className="text-sm text-gray-600">{result.exam}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{result.marks}/{result.totalMarks}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        result.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        result.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'homework' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Homework Status</h4>
            <div className="space-y-3">
              {homeworkData.map((homework, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{homework.title}</p>
                      <p className="text-sm text-gray-600">{homework.subject}</p>
                      <p className="text-sm text-gray-600">Due: {new Date(homework.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        homework.status === 'submitted' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {homework.status}
                      </span>
                      {homework.grade && (
                        <p className="text-sm font-medium mt-1">{homework.grade}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;