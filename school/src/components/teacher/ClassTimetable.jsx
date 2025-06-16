import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Edit3, Plus, Save, X } from 'lucide-react';
import { mockData } from '../../services/api';

const ClassTimetable = () => {
  const [timetable, setTimetable] = useState(mockData.timetable);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSlot, setNewSlot] = useState({
    day: '',
    time: '',
    subject: '',
    class: '',
    room: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '14:00-15:00',
    '15:00-16:00'
  ];

  const handleEditSlot = (index) => {
    setEditingSlot(index);
    setIsEditing(true);
  };

  const handleSaveSlot = (index, updatedSlot) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[index] = updatedSlot;
    setTimetable(updatedTimetable);
    setEditingSlot(null);
    setIsEditing(false);
  };

  const handleAddSlot = () => {
    if (newSlot.day && newSlot.time && newSlot.subject && newSlot.class && newSlot.room) {
      setTimetable([...timetable, newSlot]);
      setNewSlot({ day: '', time: '', subject: '', class: '', room: '' });
      setShowAddForm(false);
    }
  };

  const getSlotForDayAndTime = (day, time) => {
    return timetable.find(slot => slot.day === day && slot.time === time);
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
      'Physics': 'bg-green-100 text-green-800 border-green-200',
      'Chemistry': 'bg-purple-100 text-purple-800 border-purple-200',
      'Biology': 'bg-orange-100 text-orange-800 border-orange-200',
      'English': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Class Timetable</h2>
          <p className="text-gray-600 mt-1">View and manage your weekly class schedule</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Class</span>
          </button>
        </div>
      </div>

      {/* Weekly Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Classes</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{timetable.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Classes Today</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {timetable.filter(slot => slot.day === 'Monday').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Different Subjects</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {new Set(timetable.map(slot => slot.subject)).size}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {days.map(day => (
                  <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {time}
                  </td>
                  {days.map(day => {
                    const slot = getSlotForDayAndTime(day, time);
                    const slotIndex = timetable.findIndex(s => s.day === day && s.time === time);
                    
                    return (
                      <td key={`${day}-${time}`} className="px-6 py-4 whitespace-nowrap">
                        {slot ? (
                          editingSlot === slotIndex ? (
                            <EditSlotForm
                              slot={slot}
                              onSave={(updatedSlot) => handleSaveSlot(slotIndex, updatedSlot)}
                              onCancel={() => { setEditingSlot(null); setIsEditing(false); }}
                            />
                          ) : (
                            <div 
                              className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getSubjectColor(slot.subject)}`}
                              onClick={() => handleEditSlot(slotIndex)}
                            >
                              <p className="font-medium text-sm">{slot.subject}</p>
                              <p className="text-xs opacity-75">{slot.class}</p>
                              <p className="text-xs opacity-75">{slot.room}</p>
                              <Edit3 className="w-3 h-3 mt-1 opacity-50" />
                            </div>
                          )
                        ) : (
                          <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-400 hover:border-gray-400 transition-colors">
                            <span className="text-xs">Free</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Class Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Class</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                <select
                  value={newSlot.day}
                  onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  value={newSlot.time}
                  onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newSlot.subject}
                  onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  value={newSlot.class}
                  onChange={(e) => setNewSlot({ ...newSlot, class: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter class name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <input
                  type="text"
                  value={newSlot.room}
                  onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter room number"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddSlot}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Class
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Edit Slot Form Component
const EditSlotForm = ({ slot, onSave, onCancel }) => {
  const [editData, setEditData] = useState(slot);

  return (
    <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
      <input
        type="text"
        value={editData.subject}
        onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
        className="w-full p-1 text-xs border border-gray-200 rounded mb-1"
        placeholder="Subject"
      />
      <input
        type="text"
        value={editData.class}
        onChange={(e) => setEditData({ ...editData, class: e.target.value })}
        className="w-full p-1 text-xs border border-gray-200 rounded mb-1"
        placeholder="Class"
      />
      <input
        type="text"
        value={editData.room}
        onChange={(e) => setEditData({ ...editData, room: e.target.value })}
        className="w-full p-1 text-xs border border-gray-200 rounded mb-2"
        placeholder="Room"
      />
      <div className="flex space-x-1">
        <button
          onClick={() => onSave(editData)}
          className="flex-1 bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600"
        >
          <Save className="w-3 h-3 mx-auto" />
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white p-1 rounded text-xs hover:bg-gray-600"
        >
          <X className="w-3 h-3 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default ClassTimetable;