import React, { useState } from 'react';
import { BookOpen, Plus, Calendar, Paperclip, Eye, Edit3, Trash2, Download } from 'lucide-react';
import { mockData } from '../../services/api';

const HomeworkManager = () => {
  const [homework, setHomework] = useState(mockData.homework);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, create, view
  const [newHomework, setNewHomework] = useState({
    subject: '',
    class: '',
    title: '',
    description: '',
    dueDate: '',
    attachments: [],
    priority: 'medium'
  });

  const classes = ['Class 10A', 'Class 9B'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  const handleCreateHomework = () => {
    if (newHomework.subject && newHomework.class && newHomework.title && newHomework.dueDate) {
      const assignment = {
        id: `HW${String(homework.length + 1).padStart(3, '0')}`,
        ...newHomework,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      setHomework([...homework, assignment]);
      setNewHomework({
        subject: '',
        class: '',
        title: '',
        description: '',
        dueDate: '',
        attachments: [],
        priority: 'medium'
      });
      setShowCreateForm(false);
      setViewMode('list');
    }
  };

  const handleDeleteHomework = (homeworkId) => {
    if (window.confirm('Are you sure you want to delete this homework assignment?')) {
      setHomework(homework.filter(hw => hw.id !== homeworkId));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileNames = files.map(file => file.name);
    setNewHomework(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...fileNames]
    }));
  };

  const removeAttachment = (index) => {
    setNewHomework(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Homework Manager</h2>
          <p className="text-gray-600 mt-1">Create and manage homework assignments for your classes</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            View Homework
          </button>
          <button
            onClick={() => {
              setViewMode('create');
              setShowCreateForm(true);
            }}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              viewMode === 'create' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {/* Homework Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Assignments</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{homework.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Active</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {homework.filter(hw => hw.status === 'active').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Overdue</p>
              <p className="text-2xl font-bold text-red-900 mt-1">
                {homework.filter(hw => isOverdue(hw.dueDate)).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">High Priority</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {homework.filter(hw => hw.priority === 'high').length}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Homework Assignments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {homework.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{assignment.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          isOverdue(assignment.dueDate) ? 'bg-red-100 text-red-800' : getStatusColor(assignment.status)
                        }`}>
                          {isOverdue(assignment.dueDate) ? 'overdue' : assignment.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{assignment.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          <span>{assignment.subject}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{assignment.class}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Paperclip className="w-4 h-4 mr-2" />
                          <span>{assignment.attachments?.length || 0} files</span>
                        </div>
                      </div>

                      {assignment.attachments && assignment.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                          <div className="flex flex-wrap gap-2">
                            {assignment.attachments.map((file, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                {file}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => {
                          setSelectedHomework(assignment);
                          setViewMode('view');
                        }}
                        className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteHomework(assignment.id)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {homework.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No homework assignments created yet</p>
                  <button 
                    onClick={() => {
                      setViewMode('create');
                      setShowCreateForm(true);
                    }}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Assignment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'create' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Homework Assignment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={newHomework.subject}
                onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                value={newHomework.class}
                onChange={(e) => setNewHomework({ ...newHomework, class: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Class</option>
                {classes.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
              <input
                type="text"
                value={newHomework.title}
                onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Quadratic Equations Practice"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={newHomework.dueDate}
                onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newHomework.priority}
                onChange={(e) => setNewHomework({ ...newHomework, priority: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newHomework.description}
              onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter detailed instructions for the assignment..."
            />
          </div>

          {newHomework.attachments.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Files</label>
              <div className="space-y-2">
                {newHomework.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{file}</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleCreateHomework}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Assignment</span>
            </button>
            <button
              onClick={() => {
                setViewMode('list');
                setShowCreateForm(false);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {viewMode === 'view' && selectedHomework && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Assignment Details</h3>
              <p className="text-gray-600">{selectedHomework.title}</p>
            </div>
            <button
              onClick={() => setViewMode('list')}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back to List
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <p className="text-gray-900">{selectedHomework.subject}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <p className="text-gray-900">{selectedHomework.class}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <p className="text-gray-900">{new Date(selectedHomework.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedHomework.priority)}`}>
                  {selectedHomework.priority}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedHomework.status)}`}>
                  {selectedHomework.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                <p className="text-gray-900">{new Date(selectedHomework.createdDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900">{selectedHomework.description}</p>
            </div>
          </div>

          {selectedHomework.attachments && selectedHomework.attachments.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
              <div className="space-y-2">
                {selectedHomework.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeworkManager;