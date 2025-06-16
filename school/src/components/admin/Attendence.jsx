import React, { useState } from 'react';
import { Calendar, Download, Users, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Attendance Reports</h2>
          <p className="text-gray-600">Monitor student and teacher attendance</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="10-A">Grade 10-A</option>
              <option value="10-B">Grade 10-B</option>
              <option value="9-A">Grade 9-A</option>
              <option value="9-B">Grade 9-B</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Present</p>
              <p className="text-2xl font-bold text-gray-900">109</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Absent</p>
              <p className="text-2xl font-bold text-gray-900">11</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">90.8%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Late Arrivals</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Attendance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Individual Attendance - {selectedClass}</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Present' ? 'bg-green-100 text-green-800' :
                    student.status === 'Absent' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.status}
                  </span>
                </TableCell>
                <TableCell>{student.time}</TableCell>
                <TableCell>
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm">Edit</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Class-wise Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Class-wise Summary</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Present</TableHead>
              <TableHead>Absent</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classStats.map((stat) => (
              <TableRow key={stat.class}>
                <TableCell className="font-medium">{stat.class}</TableCell>
                <TableCell className="text-green-600">{stat.present}</TableCell>
                <TableCell className="text-red-600">{stat.absent}</TableCell>
                <TableCell>{stat.total}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${stat.percentage}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{stat.percentage}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceReports;
