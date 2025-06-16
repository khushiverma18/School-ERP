import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Download,
  Eye
} from 'lucide-react';

const Homework = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedFile, setSelectedFile] = useState(null);

  const homeworkData = {
    pending: [
      {
        id: 'hw_001',
        subject: 'Mathematics',
        title: 'Algebra Problems - Chapter 5',
        description: 'Complete exercises 1-20 from Chapter 5. Show all working steps.',
        assignedDate: '2024-12-10',
        dueDate: '2024-12-15',
        priority: 'high',
        attachments: ['algebra_exercises.pdf'],
        estimatedTime: '2 hours'
      },
      {
        id: 'hw_002',
        subject: 'Science',
        title: 'Lab Report - Chemical Reactions',
        description: 'Write a detailed lab report on the chemical reactions experiment conducted in class.',
        assignedDate: '2024-12-11',
        dueDate: '2024-12-16',
        priority: 'medium',
        attachments: ['lab_template.doc'],
        estimatedTime: '1.5 hours'
      },
      {
        id: 'hw_003',
        subject: 'English',
        title: 'Essay on Climate Change',
        description: 'Write a 500-word essay on the impact of climate change on local ecosystems.',
        assignedDate: '2024-12-12',
        dueDate: '2024-12-18',
        priority: 'medium',
        attachments: [],
        estimatedTime: '3 hours'
      }
    ],
    submitted: [
      {
        id: 'hw_004',
        subject: 'History',
        title: 'World War II Timeline',
        description: 'Create a detailed timeline of major World War II events.',
        submittedDate: '2024-12-08',
        dueDate: '2024-12-09',
        grade: 'A',
        feedback: 'Excellent work! Very comprehensive timeline with good analysis.',
        attachments: ['ww2_timeline.pdf']
      },
      {
        id: 'hw_005',
        subject: 'Geography',
        title: 'Climate Zones Map',
        description: 'Draw and label a world map showing different climate zones.',
        submittedDate: '2024-12-05',
        dueDate: '2024-12-06',
        grade: 'B+',
        feedback: 'Good work, but some labels could be more accurate.',
        attachments: ['climate_map.jpg']
      }
    ]
  };

  const handleFileUpload = (homeworkId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile({ homeworkId, file });
        alert(`File "${file.name}" selected for upload to ${homeworkId}`);
      }
    };
    input.click();
  };

  const submitHomework = (homeworkId) => {
    alert(`Homework ${homeworkId} submitted successfully!`);
  };

  const downloadAttachment = (filename) => {
    alert(`Downloading ${filename}...`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Homework Management</h1>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="font-semibold text-orange-900">Pending</h3>
                <p className="text-2xl font-bold text-orange-600">{homeworkData.pending.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{homeworkData.submitted.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">This Week</h3>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              Pending Assignments
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submitted'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              Submitted & Graded
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-6">
              {homeworkData.pending.map((homework) => {
                const daysUntilDue = getDaysUntilDue(homework.dueDate);
                return (
                  <div key={homework.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{homework.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(homework.priority)}`}>
                            {homework.priority} priority
                          </span>
                          {daysUntilDue <= 2 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                              Due soon!
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{homework.subject}</p>
                        <p className="text-gray-700 mb-4">{homework.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(homework.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Est. {homework.estimatedTime}
                          </div>
                        </div>

                        {homework.attachments.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                            <div className="flex gap-2">
                              {homework.attachments.map((file, index) => (
                                <button
                                  key={index}
                                  onClick={() => downloadAttachment(file)}
                                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                                >
                                  <FileText className="h-4 w-4" />
                                  {file}
                                  <Download className="h-3 w-3" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleFileUpload(homework.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Work
                      </button>
                      <button
                        onClick={() => submitHomework(homework.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Submit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'submitted' && (
            <div className="space-y-6">
              {homeworkData.submitted.map((homework) => (
                <div key={homework.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{homework.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(homework.grade)}`}>
                          Grade: {homework.grade}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{homework.subject}</p>
                      <p className="text-gray-700 mb-4">{homework.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Submitted: {new Date(homework.submittedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          On time
                        </div>
                      </div>

                      {homework.feedback && (
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-blue-900 mb-2">Teacher Feedback:</h4>
                          <p className="text-blue-800">{homework.feedback}</p>
                        </div>
                      )}

                      {homework.attachments.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Submitted Files:</p>
                          <div className="flex gap-2">
                            {homework.attachments.map((file, index) => (
                              <button
                                key={index}
                                onClick={() => downloadAttachment(file)}
                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                              >
                                <FileText className="h-4 w-4" />
                                {file}
                                <Eye className="h-3 w-3" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homework;