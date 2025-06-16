import React, { useState } from 'react';
import { FileText, Plus, Calendar, Clock, Users, Edit3, Save, Trash2 } from 'lucide-react';
import { mockData } from '../../services/api';

const ExamManagement = () => {
  const [exams, setExams] = useState(mockData.exams);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, create, marks
  const [newExam, setNewExam] = useState({
    subject: '',
    class: '',
    title: '',
    date: '',
    totalMarks: '',
    duration: '',
    description: '',
    syllabus: ''
  });

  const classes = ['Class 10A', 'Class 9B'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const handleCreateExam = () => {
    if (newExam.subject && newExam.class && newExam.title && newExam.date) {
      const exam = {
        id: `EX${String(exams.length + 1).padStart(3, '0')}`,
        ...newExam,
        status: 'upcoming'
      };
      
      setExams([...exams, exam]);
      setNewExam({
        subject: '',
        class: '',
        title: '',
        date: '',
        totalMarks: '',
        duration: '',
        description: '',
        syllabus: ''
      });
      setShowCreateForm(false);
      setViewMode('list');
    }
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== examId));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Management</h2>
          <p className="text-gray-600 mt-1">Create and manage exams for your classes</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            View Exams
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
            <span>Create Exam</span>
          </button>
        </div>
      </div>

      {/* Exam Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Exams</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{exams.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Upcoming</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">
                {exams.filter(exam => exam.status === 'upcoming').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {exams.filter(exam => exam.status === 'completed').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Classes</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {new Set(exams.map(exam => exam.class)).size}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Exam List</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{exam.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(exam.status)}`}>
                          {exam.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <span>{exam.subject}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{exam.class}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(exam.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{exam.duration}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center space-x-4 text-sm">
                        <span className="font-medium">Total Marks: {exam.totalMarks}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button 
                        onClick={() => {
                          setSelectedExam(exam);
                          setViewMode('marks');
                        }}
                        className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm"
                      >
                        Enter Marks
                      </button>
                      <button className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteExam(exam.id)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {exams.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No exams created yet</p>
                  <button 
                    onClick={() => {
                      setViewMode('create');
                      setShowCreateForm(true);
                    }}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Exam
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'create' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Exam</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={newExam.subject}
                onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
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
                value={newExam.class}
                onChange={(e) => setNewExam({ ...newExam, class: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Class</option>
                {classes.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
              <input
                type="text"
                value={newExam.title}
                onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mid-term Examination"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
              <input
                type="date"
                value={newExam.date}
                onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
              <input
                type="number"
                value={newExam.totalMarks}
                onChange={(e) => setNewExam({ ...newExam, totalMarks: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={newExam.duration}
                onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3 hours"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newExam.description}
              onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter exam description..."
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Syllabus Coverage</label>
            <textarea
              value={newExam.syllabus}
              onChange={(e) => setNewExam({ ...newExam, syllabus: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter syllabus topics to be covered..."
            />
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleCreateExam}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Create Exam</span>
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

      {viewMode === 'marks' && selectedExam && (
        <MarksEntry 
          exam={selectedExam} 
          onBack={() => setViewMode('list')}
          students={mockData.students.filter(s => s.class === selectedExam.class)}
        />
      )}
    </div>
  );
};

// Marks Entry Component
const MarksEntry = ({ exam, onBack, students }) => {
  const [marks, setMarks] = useState({});

  const handleMarkChange = (studentId, mark) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: mark
    }));
  };

  const handleSaveMarks = () => {
    const marksData = {
      examId: exam.id,
      marks: Object.entries(marks).map(([studentId, mark]) => ({
        studentId,
        marks: parseInt(mark),
        totalMarks: parseInt(exam.totalMarks)
      }))
    };
    
    console.log('Saving marks:', marksData);
    alert('Marks saved successfully!');
    onBack();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Enter Marks</h3>
          <p className="text-gray-600">{exam.title} - {exam.subject} ({exam.class})</p>
        </div>
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Back to Exams
        </button>
      </div>

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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max={exam.totalMarks}
                  value={marks[student.id] || ''}
                  onChange={(e) => handleMarkChange(student.id, e.target.value)}
                  className="w-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  placeholder="0"
                />
                <span className="text-gray-600">/ {exam.totalMarks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSaveMarks}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save All Marks</span>
        </button>
      </div>
    </div>
  );
};

export default ExamManagement;