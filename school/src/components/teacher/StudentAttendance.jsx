import React, { useState } from 'react';
import { Users, Calendar, Check, X, Edit3, BarChart3, Download } from 'lucide-react';
import { mockData } from '../../services/api';

const StudentAttendances = () => {
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [viewMode, setViewMode] = useState('mark'); // mark, view, analytics

  const students = mockData.students.filter(student => student.class === selectedClass);
  const classes = ['Class 10A', 'Class 9B'];

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    const attendanceData = {
      class: selectedClass,
      date: selectedDate,
      attendance: Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status
      }))
    };
    
    console.log('Submitting attendance:', attendanceData);
    // API call would go here
    alert('Attendance marked successfully!');
  };

  const getAttendanceStats = () => {
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    const total = students.length;
    
    return { present, absent, late, total, percentage: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Attendance</h2>
          <p className="text-gray-600 mt-1">Mark and manage daily attendance for your classes</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('mark')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'mark' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mark Attendance
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Class and Date Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {classes.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSubmitAttendance}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'mark' && (
        <>
          {/* Attendance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Present</p>
                  <p className="text-2xl font-bold text-green-900">{stats.present}</p>
                </div>
                <Check className="w-6 h-6 text-green-500" />
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Absent</p>
                  <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
                </div>
                <X className="w-6 h-6 text-red-500" />
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Late</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.late}</p>
                </div>
                <Calendar className="w-6 h-6 text-yellow-500" />
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Percentage</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.percentage}%</p>
                </div>
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Students in {selectedClass}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAttendanceChange(student.id, 'present')}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                          attendance[student.id] === 'present'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>Present</span>
                      </button>

                      <button
                        onClick={() => handleAttendanceChange(student.id, 'late')}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                          attendance[student.id] === 'late'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Late</span>
                      </button>

                      <button
                        onClick={() => handleAttendanceChange(student.id, 'absent')}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                          attendance[student.id] === 'absent'
                            ? 'bg-red-600 text-white'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        <X className="w-4 h-4" />
                        <span>Absent</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {viewMode === 'analytics' && (
        <div className="space-y-6">
          {/* Analytics Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Analytics</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Student Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900">Individual Student Performance</h4>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{student.attendance}%</p>
                        <p className="text-sm text-gray-600">Attendance</p>
                      </div>
                      
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            student.attendance >= 85 ? 'bg-green-500' :
                            student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>

                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Attendance</span>
                  <span className="font-bold text-green-600">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Day</span>
                  <span className="font-bold text-blue-600">Friday (95%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lowest Day</span>
                  <span className="font-bold text-red-600">Monday (78%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Classes</span>
                  <span className="font-bold text-gray-900">22</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Excellent (90%+)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-10 bg-green-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Good (75-89%)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-6 bg-yellow-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Needs Attention (&lt;75%)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="w-3 bg-red-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">13%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendances;