import React, { useState } from 'react';
import { Award, Upload, Download, Eye, Edit3, Plus, FileText, BarChart3 } from 'lucide-react';
import { mockData } from '../../services/api';

const ExamResult = () => {
  const [results, setResults] = useState([
    {
      id: 'RES001',
      examTitle: 'Mid-term Mathematics',
      subject: 'Mathematics',
      class: 'Class 10A',
      date: '2024-01-15',
      totalStudents: 25,
      averageScore: 78.5,
      highestScore: 95,
      lowestScore: 45,
      status: 'published',
      reportCard: 'math_midterm_report.pdf'
    },
    {
      id: 'RES002',
      examTitle: 'Physics Unit Test',
      subject: 'Physics',
      class: 'Class 9B',
      date: '2024-01-12',
      totalStudents: 20,
      averageScore: 72.3,
      highestScore: 88,
      lowestScore: 52,
      status: 'draft',
      reportCard: null
    }
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, upload, details
  const [newResult, setNewResult] = useState({
    examTitle: '',
    subject: '',
    class: '',
    date: '',
    reportFile: null
  });

  const classes = ['Class 10A', 'Class 9B'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const handleUploadResult = () => {
    if (newResult.examTitle && newResult.subject && newResult.class && newResult.date) {
      const result = {
        id: `RES${String(results.length + 1).padStart(3, '0')}`,
        ...newResult,
        totalStudents: Math.floor(Math.random() * 30) + 15,
        averageScore: Math.floor(Math.random() * 30) + 60,
        highestScore: Math.floor(Math.random() * 20) + 80,
        lowestScore: Math.floor(Math.random() * 30) + 30,
        status: 'draft',
        reportCard: newResult.reportFile ? newResult.reportFile.name : null
      };
      
      setResults([...results, result]);
      setNewResult({
        examTitle: '',
        subject: '',
        class: '',
        date: '',
        reportFile: null
      });
      setShowUploadForm(false);
      setViewMode('list');
    }
  };

  const handlePublishResult = (resultId) => {
    setResults(results.map(result => 
      result.id === resultId 
        ? { ...result, status: 'published' }
        : result
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getGradeDistribution = (averageScore) => {
    // Mock grade distribution based on average score
    if (averageScore >= 85) {
      return { A: 40, B: 35, C: 20, D: 5 };
    } else if (averageScore >= 75) {
      return { A: 25, B: 40, C: 25, D: 10 };
    } else if (averageScore >= 65) {
      return { A: 15, B: 30, C: 35, D: 20 };
    } else {
      return { A: 10, B: 20, C: 40, D: 30 };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Results</h2>
          <p className="text-gray-600 mt-1">Upload and manage exam results and report cards</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            View Results
          </button>
          <button
            onClick={() => {
              setViewMode('upload');
              setShowUploadForm(true);
            }}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              viewMode === 'upload' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Upload Results</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Results</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{results.length}</p>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Published</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {results.filter(r => r.status === 'published').length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Draft</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">
                {results.filter(r => r.status === 'draft').length}
              </p>
            </div>
            <Edit3 className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Avg. Score</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.averageScore, 0) / results.length) : 0}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Exam Results</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{result.examTitle}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(result.status)}`}>
                          {result.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <span>{result.subject}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          <span>{result.class}</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          <span>{result.totalStudents} students</span>
                        </div>
                        <div className="flex items-center">
                          <span>Date: {new Date(result.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-blue-600 font-medium">Average Score</p>
                          <p className="text-xl font-bold text-blue-900">{result.averageScore}%</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-green-600 font-medium">Highest Score</p>
                          <p className="text-xl font-bold text-green-900">{result.highestScore}%</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-red-600 font-medium">Lowest Score</p>
                          <p className="text-xl font-bold text-red-900">{result.lowestScore}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <button 
                        onClick={() => {
                          setSelectedResult(result);
                          setViewMode('details');
                        }}
                        className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {result.reportCard && (
                        <button className="bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      
                      {result.status === 'draft' && (
                        <button 
                          onClick={() => handlePublishResult(result.id)}
                          className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                        >
                          Publish
                        </button>
                      )}
                      
                      <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {results.length === 0 && (
                <div className="text-center py-12">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No exam results uploaded yet</p>
                  <button 
                    onClick={() => {
                      setViewMode('upload');
                      setShowUploadForm(true);
                    }}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Upload Your First Result
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'upload' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Exam Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Title</label>
              <input
                type="text"
                value={newResult.examTitle}
                onChange={(e) => setNewResult({ ...newResult, examTitle: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mid-term Mathematics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={newResult.subject}
                onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
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
                value={newResult.class}
                onChange={(e) => setNewResult({ ...newResult, class: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Class</option>
                {classes.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
              <input
                type="date"
                value={newResult.date}
                onChange={(e) => setNewResult({ ...newResult, date: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Card (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setNewResult({ ...newResult, reportFile: e.target.files[0] })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">Upload the complete report card in PDF format</p>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleUploadResult}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Results</span>
            </button>
            <button
              onClick={() => {
                setViewMode('list');
                setShowUploadForm(false);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {viewMode === 'details' && selectedResult && (
        <ResultDetails 
          result={selectedResult} 
          onBack={() => setViewMode('list')}
          gradeDistribution={getGradeDistribution(selectedResult.averageScore)}
        />
      )}
    </div>
  );
};

// Result Details Component
const ResultDetails = ({ result, onBack, gradeDistribution }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Result Details</h3>
          <p className="text-gray-600">{result.examTitle}</p>
        </div>
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Back to Results
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Exam Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subject:</span>
              <span className="font-medium">{result.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="font-medium">{result.class}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date(result.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Students:</span>
              <span className="font-medium">{result.totalStudents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(result.status)}`}>
                {result.status}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Performance Statistics</h4>
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-600 font-medium text-sm">Average Score</p>
              <p className="text-2xl font-bold text-blue-900">{result.averageScore}%</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-600 font-medium text-sm">Highest Score</p>
              <p className="text-2xl font-bold text-green-900">{result.highestScore}%</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-600 font-medium text-sm">Lowest Score</p>
              <p className="text-2xl font-bold text-red-900">{result.lowestScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="mt-8">
        <h4 className="font-semibold text-gray-900 mb-4">Grade Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(gradeDistribution).map(([grade, percentage]) => (
            <div key={grade} className="text-center p-4 border border-gray-200 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
              <p className="text-sm text-gray-600">Grade {grade}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    grade === 'A' ? 'bg-green-500' :
                    grade === 'B' ? 'bg-blue-500' :
                    grade === 'C' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex space-x-4">
        {result.reportCard && (
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Report Card</span>
          </button>
        )}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Edit3 className="w-4 h-4" />
          <span>Edit Results</span>
        </button>
      </div>
    </div>
  );
};

export default ExamResult;