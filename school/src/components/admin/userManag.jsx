import React, { useContext, useState } from 'react';
import { Users, User, GraduationCap, UserPlus, Search, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { AppContext } from '../../context/contexts.jsx';

const UserManagement = ({ tempteach = [], tempStudents = [], tempparent = [] }) => {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle case where context is not yet loaded
  if (!context) {
    return <div className="text-center py-10 text-gray-500">Loading user data...</div>;
  }

  const { teachers = [], parents = [], students = [] } = context;

  const allParents = [...tempparent, ...parents];
  const allStudents = [...tempStudents, ...students];
  const allTeachers = [...tempteach, ...teachers];

  const tabs = [
    { id: 'students', label: 'Students', icon: GraduationCap, count: allStudents.length },
    { id: 'teachers', label: 'Teachers', icon: User, count: allTeachers.length },
    { id: 'parents', label: 'Parents', icon: Users, count: allParents.length },
  ];

  const getFilteredUsers = () => {
    const dataset =
      activeTab === 'students' ? allStudents :
      activeTab === 'teachers' ? allTeachers :
      allParents;

    return dataset.filter(user =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage students, teachers, and parents</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>
                {activeTab === 'students'
                  ? 'Class'
                  : activeTab === 'teachers'
                  ? 'Subject'
                  : 'Child'}
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredUsers().map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  {activeTab === 'students'
                    ? user.Class
                    : activeTab === 'teachers'
                    ? user.subject
                    : user.child}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 text-sm">
                      Delete
                    </button>
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

export default UserManagement;
