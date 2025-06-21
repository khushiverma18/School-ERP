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

  const statCards = [
    { label: 'Total Revenue', value: '$125,400', icon: <DollarSign className="text-green-600" />, bg: 'bg-green-50' },
    { label: 'Pending Payments', value: '$24,800', icon: <DollarSign className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Overdue', value: '$8,200', icon: <AlertCircle className="text-red-600" />, bg: 'bg-red-50' },
    { label: 'Collection Rate', value: '92%', icon: <DollarSign className="text-purple-600" />, bg: 'bg-purple-50' }
  ];

  const getStatusStyle = (status) => {
    return status === 'Paid'
      ? 'bg-green-100 text-green-800'
      : status === 'Pending'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-8 px-6 py-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">💰 Fee Management</h2>
          <p className="text-gray-600 mt-1">Manage fee structure, track payments and export reports.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow">
            <Upload className="w-4 h-4" />
            Import Payments
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl p-5 shadow-md border ${card.bg} flex items-center gap-4`}
          >
            <div className="bg-white rounded-full p-2 shadow">{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className="text-xl font-bold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 text-sm font-medium">
          {[
            { id: 'overview', label: 'Payment Status' },
            { id: 'structure', label: 'Fee Structure' },
            { id: 'receipts', label: 'Generate Receipts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 transition-all duration-200 ${
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

      {/* Content by Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* Payment Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
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
                  <TableRow key={payment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{payment.student}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(payment.status)}`}>
                        {payment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <button className="text-indigo-600 hover:underline text-sm">View</button>
                        {payment.status !== 'Paid' && (
                          <button className="text-green-600 hover:underline text-sm">Mark Paid</button>
                        )}
                        <button className="text-blue-600 hover:underline text-sm">Receipt</button>
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
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Class</TableHead>
                <TableHead>Tuition Fee</TableHead>
                <TableHead>Activities Fee</TableHead>
                <TableHead>Transport Fee</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((fee, i) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{fee.class}</TableCell>
                  <TableCell>${fee.tuition}</TableCell>
                  <TableCell>${fee.activities}</TableCell>
                  <TableCell>${fee.transport}</TableCell>
                  <TableCell className="font-bold">${fee.total}</TableCell>
                  <TableCell>
                    <button className="text-indigo-600 hover:underline text-sm">Edit</button>
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
