import React, { useState } from 'react';
import { ChartBar, Download, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const AnalyticsReports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', label: 'Overview Dashboard', icon: ChartBar },
    { id: 'attendance', label: 'Attendance Analytics', icon: Users },
    { id: 'financial', label: 'Financial Reports', icon: DollarSign },
    { id: 'academic', label: 'Academic Performance', icon: TrendingUp },
  ];

  const kpiData = [
    { title: 'Student Enrollment', value: '2,847', change: '+12%', trend: 'up' },
    { title: 'Attendance Rate', value: '94.2%', change: '+2.1%', trend: 'up' },
    { title: 'Fee Collection', value: '87.5%', change: '-3.2%', trend: 'down' },
    { title: 'Teacher Satisfaction', value: '4.6/5', change: '+0.3', trend: 'up' },
  ];

  const monthlyEnrollmentData = [
    { month: 'Jan', students: 400 },
    { month: 'Feb', students: 700 },
    { month: 'Mar', students: 800 },
    { month: 'Apr', students: 600 },
    { month: 'May', students: 900 },
    { month: 'Jun', students: 1000 },
  ];

  const classDistributionData = [
    { name: 'Class 1', value: 400 },
    { name: 'Class 2', value: 300 },
    { name: 'Class 3', value: 300 },
    { name: 'Class 4', value: 200 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  // === Export functions ===

  // Export Monthly Enrollment as PDF
  const generateMonthlyEnrollmentPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Monthly Enrollment Report", 14, 22);

    const tableColumn = ["Month", "Students Enrolled"];
    const tableRows = [];

    monthlyEnrollmentData.forEach(item => {
      tableRows.push([item.month, item.students.toString()]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("monthly-enrollment-report.pdf");
  };

  // Export KPI Data as CSV
  const exportAllKpisToCsv = () => {
    const csvRows = [
      ['Title', 'Value', 'Change', 'Trend'],
      ...kpiData.map(kpi => [kpi.title, kpi.value, kpi.change, kpi.trend])
    ];

    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "kpi-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Daily Attendance PDF (example static data)
  const generateDailyAttendancePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Daily Attendance Report", 14, 22);

    const tableColumn = ["Student Name", "Status"];
    const tableRows = [
      ["John Doe", "Present"],
      ["Jane Smith", "Absent"],
      ["Alice Johnson", "Present"],
      ["Bob Brown", "Present"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("daily-attendance-report.pdf");
  };

  // Export Fee Collection Excel (example static data)
  const exportFeeCollectionExcel = () => {
    const data = [
      { Month: "Jan", Collection: 10000 },
      { Month: "Feb", Collection: 12000 },
      { Month: "Mar", Collection: 9000 },
      { Month: "Apr", Collection: 11000 },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Collection");
    XLSX.writeFile(workbook, "fee-collection-report.xlsx");
  };

  // Export Academic Performance PDF (example static data)
  const generateAcademicPerformancePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Academic Performance Report", 14, 22);

    const tableColumn = ["Class", "Average Score"];
    const tableRows = [
      ["Class 1", "85%"],
      ["Class 2", "88%"],
      ["Class 3", "82%"],
      ["Class 4", "90%"],
    ];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("academic-performance-report.pdf");
  };

  // Schedule Report placeholder
  const handleScheduleReport = () => {
    alert("Schedule Report functionality to be implemented!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive insights and downloadable reports</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleScheduleReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
          <button
            onClick={exportAllKpisToCsv}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {reportTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedReport === type.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm font-medium">{type.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {kpi.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <TrendingUp
                  className={`h-6 w-6 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      {selectedReport === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Enrollment Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={monthlyEnrollmentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <button
              onClick={generateMonthlyEnrollmentPdf}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
              Export Enrollment PDF
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={classDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                >
                  {classDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Quick Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Daily Attendance */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Daily Attendance</h4>
              <button className="text-indigo-600 hover:text-indigo-800">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">Yesterday's attendance summary</p>
            <button
              onClick={generateDailyAttendancePdf}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm"
            >
              Generate PDF
            </button>
          </div>

          {/* Fee Collection */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Fee Collection</h4>
              <button className="text-indigo-600 hover:text-indigo-800">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">Monthly fee collection report</p>
            <button
              onClick={exportFeeCollectionExcel}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm"
            >
              Generate Excel
            </button>
          </div>

          {/* Academic Performance */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Academic Performance</h4>
              <button className="text-indigo-600 hover:text-indigo-800">
                <Download className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">Class-wise exam results</p>
            <button
              onClick={generateAcademicPerformancePdf}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
