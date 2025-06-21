import React, { useState } from 'react';
import { Calendar, Download, Users, TrendingUp } from 'lucide-react';

const AttendanceReports = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [selectedClass, setSelectedClass] = useState('10-A');

  const attendanceData = [
    { id: 1, name: 'John Doe', rollNo: '001', status: 'Present', time: '08:00 AM' },
    { id: 2, name: 'Sarah Wilson', rollNo: '002', status: 'Present', time: '08:05 AM' },
    { id: 3, name: 'Mike Johnson', rollNo: '003', status: 'Absent', time: '-' },
    { id: 4, name: 'Emily Davis', rollNo: '004', status: 'Late', time: '08:30 AM' },
  ];

  const classStats = [
    { class: '10-A', present: 28, absent: 2, total: 30, percentage: 93.3 },
    { class: '10-B', present: 25, absent: 5, total: 30, percentage: 83.3 },
    { class: '9-A', present: 27, absent: 3, total: 30, percentage: 90.0 },
    { class: '9-B', present: 29, absent: 1, total: 30, percentage: 96.7 },
  ];

  const getStatusColor = (status) => {
    if (status === 'Present') return 'bg-green-100 text-green-800';
    if (status === 'Absent') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-8 px-6 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">📊 Attendance Reports</h2>
          <p className="text-gray-600 mt-1">Monitor student and teacher attendance with detailed insights</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📅 Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">🏫 Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="10-A">Grade 10-A</option>
              <option value="10-B">Grade 10-B</option>
              <option value="9-A">Grade 9-A</option>
              <option value="9-B">Grade 9-B</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 shadow">
              <Calendar className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Present', value: 109, icon: <Users className="w-8 h-8 text-green-600" /> },
          { label: 'Total Absent', value: 11, icon: <Users className="w-8 h-8 text-red-600" /> },
          { label: 'Attendance Rate', value: '90.8%', icon: <TrendingUp className="w-8 h-8 text-blue-600" /> },
          { label: 'Late Arrivals', value: 5, icon: <Users className="w-8 h-8 text-orange-600" /> },
        ].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center">
            {item.icon}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Individual Attendance Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">🧍 Individual Attendance - {selectedClass}</h3>
        </div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Roll No</th>
              <th className="px-6 py-3 font-medium text-gray-600">Student Name</th>
              <th className="px-6 py-3 font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 font-medium text-gray-600">Check-in Time</th>
              <th className="px-6 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{student.rollNo}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">{student.time}</td>
                <td className="px-6 py-4">
                  <button className="text-indigo-600 hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Class-wise Summary Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">📘 Class-wise Summary</h3>
        </div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Class</th>
              <th className="px-6 py-3 font-medium text-gray-600">Present</th>
              <th className="px-6 py-3 font-medium text-gray-600">Absent</th>
              <th className="px-6 py-3 font-medium text-gray-600">Total</th>
              <th className="px-6 py-3 font-medium text-gray-600">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {classStats.map((stat) => (
              <tr key={stat.class} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{stat.class}</td>
                <td className="px-6 py-4 text-green-700 font-semibold">{stat.present}</td>
                <td className="px-6 py-4 text-red-700 font-semibold">{stat.absent}</td>
                <td className="px-6 py-4">{stat.total}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{stat.percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReports;
