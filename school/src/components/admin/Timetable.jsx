import React, { useState } from 'react';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';

const TimetableManagement = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');

  const timeSlots = ['08:00-08:45', '08:45-09:30', '09:30-10:15', '10:15-11:00', '11:00-11:45', '11:45-12:30'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetable = {
    'Monday': ['Math', 'English', 'Physics', 'Chemistry', 'Biology', 'PE'],
    'Tuesday': ['English', 'Math', 'History', 'Geography', 'Art', 'Music'],
    'Wednesday': ['Physics', 'Chemistry', 'Math', 'English', 'Computer', 'Library'],
    'Thursday': ['Biology', 'Math', 'English', 'Physics', 'Chemistry', 'Study'],
    'Friday': ['Math', 'English', 'Geography', 'History', 'PE', 'Assembly']
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Timetable Management</h2>
          <p className="text-gray-600">Create and manage class schedules</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Schedule</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="10-A">Grade 10-A</option>
            <option value="10-B">Grade 10-B</option>
            <option value="9-A">Grade 9-A</option>
            <option value="9-B">Grade 9-B</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Time</th>
                {days.map(day => (
                  <th key={day} className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900 bg-gray-50">{time}</td>
                  {days.map(day => (
                    <td key={day} className="border border-gray-300 px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-sm text-gray-900">{timetable[day][timeIndex]}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableManagement;
