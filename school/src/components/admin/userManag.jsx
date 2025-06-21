import React, { useContext, useState } from 'react';
// Import motion and AnimatePresence for animations
import { motion, AnimatePresence } from 'framer-motion';
// Import new icons for actions
import { Users, User, GraduationCap, UserPlus, Search, Filter, Pencil, Trash2, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { AppContext } from '../../context/contexts.jsx';

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};


const UserManagement = ({ tempteach = [], tempStudents = [], tempparent = [] }) => {
  const context = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClass, setSelectedClass] = useState('All');

  if (!context) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
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

  const classOptions = [...new Set(allStudents.map((s) => s.Class))];

  const filteredUsers = (() => {
    let dataset =
      activeTab === 'students' ? allStudents :
      activeTab === 'teachers' ? allTeachers :
      allParents;

    if (searchTerm) {
      dataset = dataset.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab === 'students' && selectedClass !== 'All') {
      dataset = dataset.filter((user) => user.Class === selectedClass);
    }

    return dataset;
  })();

  return (
    // Use motion.div for staggered animations on page load
    <motion.div 
      className="p-4 sm:p-6 bg-slate-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-500 mt-1">Manage all users in your institution from one place.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 flex items-center space-x-2 font-semibold"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add New User</span>
          </motion.button>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg border border-gray-200/80 p-6 space-y-6">
          {/* Tabs with Animated Underline */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 relative">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchTerm('');
                    setSelectedClass('All');
                    setShowFilters(false);
                  }}
                  className={`flex items-center space-x-2 pb-4 px-1 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  <span className={`py-0.5 px-2 rounded-full text-xs transition-colors duration-200 ${
                    activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                  {/* The animated underline */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="underline" // This ID tells Framer Motion to animate between elements
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center w-full sm:w-auto space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
            >
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-700">Filter</span>
            </button>
          </div>

          {/* Animated Filter Dropdown */}
          <AnimatePresence>
            {showFilters && activeTab === 'students' && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-2 sm:w-64 bg-gray-50 p-4 rounded-lg border"
              >
                <label className="text-sm font-semibold text-gray-800">Filter by Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="All">All Classes</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>
                      Class {cls}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table with animated rows */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Table>
              <TableHeader className="bg-indigo-600 ">
                <TableRow>
                  <TableHead className="font-semibold text-white">Name</TableHead>
                  <TableHead className="font-semibold text-white">
                    {activeTab === 'students' ? 'Class' : activeTab === 'teachers' ? 'Subject' : 'Child'}
                  </TableHead>
                  <TableHead className="font-semibold text-white">Email</TableHead>
                  <TableHead className="font-semibold text-white">Phone</TableHead>
                  <TableHead className="font-semibold text-white">Status</TableHead>
                  <TableHead className="font-semibold text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        layout // Animate layout changes (e.g., when filtering)
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-slate-50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium text-gray-800">{user.name}</TableCell>
                        <TableCell className="text-gray-600">
                          {activeTab === 'students' ? user.Class : activeTab === 'teachers' ? user.subject : user.child}
                        </TableCell>
                        <TableCell className="text-gray-600">{user.email}</TableCell>
                        <TableCell className="text-gray-600">{user.phone}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Edit User" className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-full transition-all">
                              <Pencil className="h-4 w-4" />
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="Delete User" className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-all">
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    // Nicer empty state when no users are found
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <XCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Try adjusting your search or filter to find what you're looking for.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserManagement;