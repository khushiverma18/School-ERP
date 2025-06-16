import React, { useState } from 'react';
import { GraduationCap, Search, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const AlumniManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');

  const alumni = [
    {
      id: 1,
      name: 'Alex Johnson',
      batch: '2018',
      email: 'alex@example.com',
      phone: '+1234567890',
      location: 'New York, USA',
      currentPosition: 'Software Engineer at Google',
      company: 'Google',
      industry: 'Technology',
      contributions: '$5,000',
      lastContact: '2024-01-15'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      batch: '2020',
      email: 'maria@example.com',
      phone: '+1234567891',
      location: 'California, USA',
      currentPosition: 'Medical Doctor',
      company: 'Stanford Hospital',
      industry: 'Healthcare',
      contributions: '$2,500',
      lastContact: '2023-12-20'
    },
    {
      id: 3,
      name: 'David Chen',
      batch: '2015',
      email: 'david@example.com',
      phone: '+1234567892',
      location: 'London, UK',
      currentPosition: 'Investment Banker',
      company: 'Goldman Sachs',
      industry: 'Finance',
      contributions: '$10,000',
      lastContact: '2024-01-10'
    }
  ];

  const programs = [
    {
      id: 1,
      title: 'Alumni Mentorship Program',
      description: 'Connect current students with successful alumni',
      participants: 45,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Career Guidance Workshop',
      description: 'Monthly workshops by alumni professionals',
      participants: 120,
      status: 'Active'
    },
    {
      id: 3,
      title: 'Annual Alumni Reunion',
      description: 'Yearly gathering of all alumni batches',
      participants: 300,
      status: 'Planning'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alumni Management 🎓</h2>
          <p className="text-gray-600">Maintain connections with graduates</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Send Newsletter</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>Add Alumni</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Alumni</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Employed</p>
              <p className="text-2xl font-bold text-gray-900">95%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Contacts</p>
              <p className="text-2xl font-bold text-gray-900">856</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Contributions</p>
              <p className="text-2xl font-bold text-gray-900">$125K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alumni..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Batches</option>
              <option value="2023">Batch 2023</option>
              <option value="2022">Batch 2022</option>
              <option value="2021">Batch 2021</option>
              <option value="2020">Batch 2020</option>
            </select>
          </div>
          <div>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Healthcare</option>
              <option>Finance</option>
              <option>Education</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alumni Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Alumni Directory</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Current Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Contributions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alumni.map((alum) => (
              <TableRow key={alum.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{alum.name}</div>
                    <div className="text-sm text-gray-500">{alum.email}</div>
                  </div>
                </TableCell>
                <TableCell>{alum.batch}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{alum.currentPosition}</div>
                    <div className="text-sm text-gray-500">{alum.company}</div>
                  </div>
                </TableCell>
                <TableCell>{alum.location}</TableCell>
                <TableCell className="text-green-600 font-medium">{alum.contributions}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">View</button>
                    <button className="text-green-600 hover:text-green-900 text-sm">Contact</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Alumni Programs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{program.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  program.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {program.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{program.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{program.participants} participants</span>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniManagement;
