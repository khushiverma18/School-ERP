import React, { useState } from 'react';
import { Download, Upload, Search, Filter, DollarSign, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const FeeManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const feeStructure = [
    { class: 'Grade 1-3', tuition: 1200, activities: 200, transport: 150, total: 1550 },
    { class: 'Grade 4-6', tuition: 1400, activities: 250, transport: 150, total: 1800 },
    { class: 'Grade 7-9', tuition: 1600, activities: 300, transport: 200, total: 2100 },
    { class: 'Grade 10-12', tuition: 1800, activities: 350, transport: 200, total: 2350 },
  ];

  const paymentStatus = [
    { id: 1, student: 'John Doe', class: '10-A', amount: 2350, dueDate: '2024-01-15', status: 'Paid', paidDate: '2024-01-10' },
    { id: 2, student: 'Sarah Wilson', class: '9-B', amount: 2100, dueDate: '2024-01-15', status: 'Pending', paidDate: null },
    { id: 3, student: 'Mike Johnson', class: '11-A', amount: 2350, dueDate: '2024-01-15', status: 'Overdue', paidDate: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
          <p className="text-gray-600">Manage fee structure and track payments</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import Payments</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$125,400</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">$24,800</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">$8,200</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Payment Status' },
            { id: 'structure', label: 'Fee Structure' },
            { id: 'receipts', label: 'Generate Receipts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentStatus.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.student}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm">View</button>
                        {payment.status !== 'Paid' && (
                          <button className="text-green-600 hover:text-green-900 text-sm">Mark Paid</button>
                        )}
                        <button className="text-blue-600 hover:text-blue-900 text-sm">Receipt</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {activeTab === 'structure' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Tuition Fee</TableHead>
                <TableHead>Activities Fee</TableHead>
                <TableHead>Transport Fee</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{fee.class}</TableCell>
                  <TableCell>${fee.tuition}</TableCell>
                  <TableCell>${fee.activities}</TableCell>
                  <TableCell>${fee.transport}</TableCell>
                  <TableCell className="font-bold">${fee.total}</TableCell>
                  <TableCell>
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">Edit</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;
