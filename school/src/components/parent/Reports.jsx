import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  FileText, 
  BarChart3, 
  TrendingUp,
  User,
  GraduationCap,
  Clock
} from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-term');

  const reportTypes = [
    {
      id: 'academic-report',
      title: 'Academic Performance Report',
      description: 'Comprehensive report showing grades, attendance, and progress across all subjects',
      icon: GraduationCap,
      color: 'bg-blue-500',
      lastGenerated: '2024-12-10',
      available: true
    },
    {
      id: 'attendance-report',
      title: 'Attendance Summary',
      description: 'Detailed attendance records with monthly and yearly statistics',
      icon: Calendar,
      color: 'bg-green-500',
      lastGenerated: '2024-12-12',
      available: true
    },
    {
      id: 'progress-report',
      title: 'Progress Tracking Report',
      description: 'Track academic progress over time with trend analysis and recommendations',
      icon: TrendingUp,
      color: 'bg-purple-500',
      lastGenerated: '2024-12-08',
      available: true
    },
    {
      id: 'behavioral-report',
      title: 'Behavioral Assessment',
      description: 'Teacher feedback on classroom behavior, participation, and social skills',
      icon: User,
      color: 'bg-orange-500',
      lastGenerated: '2024-12-05',
      available: true
    },
    {
      id: 'homework-report',
      title: 'Homework Completion Report',
      description: 'Analysis of homework submission rates and quality across subjects',
      icon: FileText,
      color: 'bg-indigo-500',
      lastGenerated: '2024-12-11',
      available: true
    },
    {
      id: 'exam-analysis',
      title: 'Exam Performance Analysis',
      description: 'Detailed breakdown of exam results with subject-wise performance metrics',
      icon: BarChart3,
      color: 'bg-red-500',
      lastGenerated: '2024-11-28',
      available: true
    }
  ];

  const quickStats = [
    {
      title: 'Reports Generated',
      value: '24',
      period: 'This Year',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Last Report',
      value: '2 days ago',
      period: 'Attendance Summary',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Average Grade',
      value: 'A-',
      period: 'Current Term',
      icon: GraduationCap,
      color: 'text-purple-600'
    },
    {
      title: 'Attendance Rate',
      value: '94.5%',
      period: 'This Month',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const recentReports = [
    {
      id: 'rep_001',
      title: 'Mid-Term Academic Report',
      type: 'Academic Performance',
      generatedDate: '2024-12-10',
      size: '2.3 MB',
      format: 'PDF'
    },
    {
      id: 'rep_002',
      title: 'November Attendance Summary',
      type: 'Attendance',
      generatedDate: '2024-12-01',
      size: '1.1 MB',
      format: 'PDF'
    },
    {
      id: 'rep_003',
      title: 'Q2 Progress Analysis',
      type: 'Progress Tracking',
      generatedDate: '2024-11-25',
      size: '3.2 MB',
      format: 'PDF'
    }
  ];

  const generateReport = (reportType) => {
    alert(`Generating ${reportType} report for ${selectedPeriod}...`);
  };

  const downloadReport = (reportId, title) => {
    alert(`Downloading "${title}"...`);
  };

  const scheduleReport = (reportType) => {
    alert(`Scheduling automatic generation for ${reportType}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="current-term">Current Term</option>
              <option value="last-term">Last Term</option>
              <option value="current-year">Current Academic Year</option>
              <option value="last-year">Last Academic Year</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Reports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${report.color}`}>
                  <report.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">
                    Last: {new Date(report.lastGenerated).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{report.description}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => generateReport(report.title)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate
                </button>
                <button
                  onClick={() => scheduleReport(report.title)}
                  className="px-3 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{report.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{new Date(report.generatedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span>•</span>
                    <span>{report.format}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => downloadReport(report.id, report.title)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Improving Trend</p>
                <p className="text-sm text-green-700">Mathematics scores increased by 8% this term</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Excellent Attendance</p>
                <p className="text-sm text-blue-700">Above 90% attendance for 3 consecutive months</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Academic Excellence</p>
                <p className="text-sm text-purple-700">Consistent A-grade performance across subjects</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Monthly Progress Report</p>
                <p className="text-sm text-gray-500">Next: January 1, 2025</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Term-End Academic Report</p>
                <p className="text-sm text-gray-500">Next: December 20, 2024</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Attendance Summary</p>
                <p className="text-sm text-gray-500">Next: January 1, 2025</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;