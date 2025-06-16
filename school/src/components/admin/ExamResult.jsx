import React, { useState } from 'react';
import { GraduationCap, FileText, TrendingUp, Award } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const ExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('mid-term-2024');
  const [selectedClass, setSelectedClass] = useState('10-A');

  const examResults = [
    { id: 1, name: 'John Doe', rollNo: '001', math: 85, english: 78, science: 92, total: 255, grade: 'A' },
    { id: 2, name: 'Sarah Wilson', rollNo: '002', math: 92, english: 88, science: 95, total: 275, grade: 'A+' },
    { id: 3, name: 'Mike Johnson', rollNo: '003', math: 76, english: 82, science: 79, total: 237, grade: 'B+' },
    { id: 4, name: 'Emily Davis', rollNo: '004', math: 88, english: 91, science: 87, total: 266, grade: 'A' },
  ];

  const classAnalytics = [
    { subject: 'Mathematics', average: 85.3, highest: 96, lowest: 65, passRate: 95 },
    { subject: 'English', average: 79.8, highest: 91, lowest: 58, passRate: 92 },
    { subject: 'Science', average: 88.1, highest: 98, lowest: 72, passRate: 98 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Results</h2>
          <p className="text-gray-600">View and manage examination results</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Generate Report Cards</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>Add Results</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="mid-term-2024">Mid-Term 2024</option>
              <option value="final-2024">Final Exam 2024</option>
              <option value="quarterly-2024">Quarterly 2024</option>
            </select>
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
        </div>
      </div>

      {/* Class Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Class Average</p>
              <p className="text-2xl font-bold text-gray-900">84.4%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Top Score</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900">95%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Student Results - {selectedClass}</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Math</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Science</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {examResults.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.rollNo}</TableCell>
                <TableCell className="font-medium">{result.name}</TableCell>
                <TableCell>{result.math}</TableCell>
                <TableCell>{result.english}</TableCell>
                <TableCell>{result.science}</TableCell>
                <TableCell className="font-bold">{result.total}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.grade === 'A+' ? 'bg-green-100 text-green-800' :
                    result.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.grade}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">Edit</button>
                    <button className="text-green-600 hover:text-green-900 text-sm">Report Card</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Subject-wise Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Subject-wise Analytics</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Class Average</TableHead>
              <TableHead>Highest Score</TableHead>
              <TableHead>Lowest Score</TableHead>
              <TableHead>Pass Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classAnalytics.map((analytics) => (
              <TableRow key={analytics.subject}>
                <TableCell className="font-medium">{analytics.subject}</TableCell>
                <TableCell>{analytics.average}%</TableCell>
                <TableCell className="text-green-600">{analytics.highest}</TableCell>
                <TableCell className="text-red-600">{analytics.lowest}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${analytics.passRate}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{analytics.passRate}%</span>
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

export default ExamResults;
