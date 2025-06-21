import React, { useState } from 'react';
import { GraduationCap, FileText, TrendingUp, Award } from 'lucide-react';

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

  const classAverage = (
    examResults.reduce((acc, curr) => acc + curr.total, 0) / (examResults.length * 3)
  ).toFixed(1);

  const topScore = Math.max(...examResults.map(r => r.total));
  const topScorePercent = ((topScore / 300) * 100).toFixed(0);

  const isPass = (student) =>
    student.math >= 35 && student.english >= 35 && student.science >= 35;

  const passRate = (
    (examResults.filter(isPass).length / examResults.length) * 100
  ).toFixed(0);

  const getGradeStyle = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Results</h2>
          <p className="text-gray-900">View and manage examination results</p>
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="10-A">Grade 10-A</option>
              <option value="10-B">Grade 10-B</option>
              <option value="9-A">Grade 9-A</option>
              <option value="9-B">Grade 9-B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Class Average', value: `${classAverage}%`, icon: <TrendingUp className="h-8 w-8 text-blue-600" /> },
          { label: 'Top Score', value: `${topScorePercent}%`, icon: <Award className="h-8 w-8 text-green-600" /> },
          { label: 'Pass Rate', value: `${passRate}%`, icon: <GraduationCap className="h-8 w-8 text-purple-600" /> },
          { label: 'Total Students', value: examResults.length, icon: <FileText className="h-8 w-8 text-orange-600" /> }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
            {stat.icon}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Student Result Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Student Results - {selectedClass}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Roll No</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Student Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Math</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">English</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Science</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Total</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Grade</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4">{result.rollNo}</td>
                  <td className="px-6 py-4 font-medium">{result.name}</td>
                  <td className="px-6 py-4">{result.math}</td>
                  <td className="px-6 py-4">{result.english}</td>
                  <td className="px-6 py-4">{result.science}</td>
                  <td className="px-6 py-4 font-bold">{result.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeStyle(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-indigo-600 hover:underline">Edit</button>
                    <button className="text-green-600 hover:underline">Report Card</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject-Wise Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Subject-wise Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Subject</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Class Average</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Highest</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Lowest</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Pass Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classAnalytics.map((analytics) => (
                <tr key={analytics.subject}>
                  <td className="px-6 py-4 font-medium">{analytics.subject}</td>
                  <td className="px-6 py-4">{analytics.average}%</td>
                  <td className="px-6 py-4 text-green-600">{analytics.highest}</td>
                  <td className="px-6 py-4 text-red-600">{analytics.lowest}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${analytics.passRate}%` }}
                        ></div>
                      </div>
                      <span>{analytics.passRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
