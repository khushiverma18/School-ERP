import React, { useState } from 'react';
import { Calendar as CalendarIcon, TrendingUp, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('monthly');

  // Mock attendance data
  const attendanceData = {
    '2024-12-01': 'present',
    '2024-12-02': 'present',
    '2024-12-03': 'absent',
    '2024-12-04': 'present',
    '2024-12-05': 'present',
    '2024-12-06': 'late',
    '2024-12-09': 'present',
    '2024-12-10': 'present',
    '2024-12-11': 'present',
    '2024-12-12': 'absent',
    '2024-12-13': 'present',
  };

  const attendanceStats = {
    totalDays: 22,
    presentDays: 18,
    absentDays: 3,
    lateDays: 1,
    percentage: 81.8
  };

  const recentAttendance = [
    { date: '2024-12-13', status: 'present', time: '8:15 AM' },
    { date: '2024-12-12', status: 'absent', time: '-' },
    { date: '2024-12-11', status: 'present', time: '8:10 AM' },
    { date: '2024-12-10', status: 'present', time: '8:05 AM' },
    { date: '2024-12-09', status: 'present', time: '8:20 AM' },
    { date: '2024-12-06', status: 'late', time: '8:45 AM' },
    { date: '2024-12-05', status: 'present', time: '8:12 AM' },
  ];

  const getAttendanceStatus = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceData[dateStr] || null;
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const status = getAttendanceStatus(date);
      if (status === 'present') return 'attendance-present';
      if (status === 'absent') return 'attendance-absent';
      if (status === 'late') return 'attendance-late';
    }
    return '';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'present':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'absent':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'late':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="space-y-6">
      <style jsx>{`
        .attendance-present {
          background-color: #dcfce7 !important;
          color: #166534 !important;
        }
        .attendance-absent {
          background-color: #fecaca !important;
          color: #dc2626 !important;
        }
        .attendance-late {
          background-color: #fed7aa !important;
          color: #ea580c !important;
        }
      `}</style>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Attendance Tracking</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Total Days</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{attendanceStats.totalDays}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Present</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{attendanceStats.presentDays}</p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-600 font-medium">Absent</span>
            </div>
            <p className="text-2xl font-bold text-red-900">{attendanceStats.absentDays}</p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">Late</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">{attendanceStats.lateDays}</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">Percentage</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{attendanceStats.percentage}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Monthly Calendar</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                <span>Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
                <span>Late</span>
              </div>
            </div>
          </div>
          
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={getTileClassName}
            className="w-full border-none"
          />
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Attendance</h2>
          
          <div className="space-y-4">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(record.status)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{record.time}</p>
                  </div>
                </div>
                <span className={getStatusBadge(record.status)}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2">Best Month</h3>
            <p className="text-green-700">November 2024</p>
            <p className="text-2xl font-bold text-green-900">96.5%</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Current Streak</h3>
            <p className="text-blue-700">Consecutive present days</p>
            <p className="text-2xl font-bold text-blue-900">5 days</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-2">Average Time</h3>
            <p className="text-purple-700">School arrival time</p>
            <p className="text-2xl font-bold text-purple-900">8:12 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;