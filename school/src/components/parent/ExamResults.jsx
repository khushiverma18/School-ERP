import React, { useState } from 'react';
import { 
  TrendingUp, 
  Download, 
  Award, 
  BarChart3, 
  FileText,
  Calendar,
  Star
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('mid-term-2024');

  const examResults = {
    'mid-term-2024': {
      title: 'Mid-Term Examination 2024',
      date: '2024-11-15',
      subjects: [
        { name: 'Mathematics', score: 95, maxScore: 100, grade: 'A+', classAverage: 78 },
        { name: 'Science', score: 88, maxScore: 100, grade: 'A', classAverage: 75 },
        { name: 'English', score: 92, maxScore: 100, grade: 'A+', classAverage: 80 },
        { name: 'History', score: 85, maxScore: 100, grade: 'A', classAverage: 72 },
        { name: 'Geography', score: 90, maxScore: 100, grade: 'A+', classAverage: 76 },
        { name: 'Physical Education', score: 98, maxScore: 100, grade: 'A+', classAverage: 85 }
      ],
      overall: { score: 548, maxScore: 600, percentage: 91.3, grade: 'A+', rank: 5, totalStudents: 120 }
    },
    'quarterly-2024': {
      title: 'Quarterly Examination 2024',
      date: '2024-09-20',
      subjects: [
        { name: 'Mathematics', score: 92, maxScore: 100, grade: 'A+', classAverage: 76 },
        { name: 'Science', score: 85, maxScore: 100, grade: 'A', classAverage: 73 },
        { name: 'English', score: 89, maxScore: 100, grade: 'A', classAverage: 78 },
        { name: 'History', score: 88, maxScore: 100, grade: 'A', classAverage: 70 },
        { name: 'Geography', score: 87, maxScore: 100, grade: 'A', classAverage: 74 },
        { name: 'Physical Education', score: 96, maxScore: 100, grade: 'A+', classAverage: 83 }
      ],
      overall: { score: 537, maxScore: 600, percentage: 89.5, grade: 'A', rank: 8, totalStudents: 120 }
    }
  };

  const performanceTrend = [
    { exam: 'Q1 2024', percentage: 87.2 },
    { exam: 'Q2 2024', percentage: 89.5 },
    { exam: 'Mid-Term', percentage: 91.3 },
  ];

  const currentExam = examResults[selectedExam];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-600';
      case 'A': return 'text-blue-600';
      case 'B+': return 'text-yellow-600';
      case 'B': return 'text-orange-600';
      default: return 'text-red-600';
    }
  };

  const getGradeBg = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-100';
      case 'A': return 'bg-blue-100';
      case 'B+': return 'bg-yellow-100';
      case 'B': return 'bg-orange-100';
      default: return 'bg-red-100';
    }
  };

  const downloadReportCard = () => {
    alert('Downloading report card...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <button
            onClick={downloadReportCard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Report Card
          </button>
        </div>

        {/* Exam Selection */}
        <div className="flex gap-4 mb-6">
          {Object.entries(examResults).map(([key, exam]) => (
            <button
              key={key}
              onClick={() => setSelectedExam(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedExam === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {exam.title}
            </button>
          ))}
        </div>

        {/* Overall Performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Overall Score</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {currentExam.overall.score}/{currentExam.overall.maxScore}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Percentage</span>
            </div>
            <p className="text-2xl font-bold text-green-900">{currentExam.overall.percentage}%</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">Grade</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">{currentExam.overall.grade}</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">Class Rank</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">
              {currentExam.overall.rank}/{currentExam.overall.totalStudents}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Results */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject-wise Performance</h2>
          
          <div className="space-y-4">
            {currentExam.subjects.map((subject, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{subject.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeBg(subject.grade)} ${getGradeColor(subject.grade)}`}>
                    {subject.grade}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-gray-900">
                    {subject.score}/{subject.maxScore}
                  </span>
                  <span className="text-sm text-gray-600">
                    Class Avg: {subject.classAverage}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(subject.score / subject.maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject Performance Chart</h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentExam.subjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" name="Your Score" />
              <Bar dataKey="classAverage" fill="#E5E7EB" name="Class Average" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Trend</h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="exam" />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Improvement Trend</span>
          </div>
          <p className="text-green-700 mt-1">
            Great progress! Your performance has improved by 4.1% since the first quarter.
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-900">Top 5 in Class</h3>
              <p className="text-yellow-700 text-sm">Mid-term examination</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Perfect Score</h3>
              <p className="text-green-700 text-sm">Physical Education</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Consistent Improvement</h3>
              <p className="text-blue-700 text-sm">All subjects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;