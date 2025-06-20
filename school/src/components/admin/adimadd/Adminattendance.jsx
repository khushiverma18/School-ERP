import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, GraduationCap, Clock, CheckCircle, XCircle } from 'lucide-react';
import { AppContext } from '../../../context/contexts'; // Make sure this path is correct
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatePresence } from "motion/react"
import AdminHeader from '../AdminHeader';

const AdminAttendance = () => {
  const { students, teachers, markAttendance, attendanceRecords } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [role, setRole] = useState('student');
  const [selectedClass, setSelectedClass] = useState('All');
  const [attendanceForDate, setAttendanceForDate] = useState({});
  const [listKey, setListKey] = useState(0); // Key to re-trigger list animations

  // Memoize derived data for performance
  const studentClasses = React.useMemo(() => [...new Set(students.map(s => s.class || s.Class).filter(Boolean))], [students]);
  const filteredStudents = React.useMemo(() => (
    selectedClass === 'All' ? students : students.filter(s => (s.class || s.Class) === selectedClass)
  ), [students, selectedClass]);
  const list = role === 'student' ? filteredStudents : teachers;

  // Effect to update attendance status when date or list changes
  useEffect(() => {
    const records = {};
    if (list) {
      list.forEach(person => {
        const status = attendanceRecords?.[person.id]?.[date];
        if (status) {
          records[person.id] = status;
        }
      });
    }
    setAttendanceForDate(records);
  }, [date, list, attendanceRecords]);

  // Handle role change and reset filters
  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setRole(newRole);
      setSelectedClass('All');
      setListKey(prevKey => prevKey + 1); // Re-trigger animations
    }
  };

  const handleAttendance = (id, status) => {
    markAttendance(id, date, status);
    // Optimistic UI update
    setAttendanceForDate(prev => ({ ...prev, [id]: status }));
  };

  // Helper to get styled status badge
  const getStatusBadge = (status) => {
    if (status === 'Present') {
      return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>;
    }
    if (status === 'Absent') {
      return <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">Absent</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground">Not Marked</Badge>;
  };

  // Calculate attendance statistics
  const getAttendanceStats = () => {
    const total = list?.length || 0;
    const present = Object.values(attendanceForDate).filter(status => status === 'Present').length;
    const absent = Object.values(attendanceForDate).filter(status => status === 'Absent').length;
    const notMarked = total - present - absent;
    return { total, present, absent, notMarked };
  };

  const stats = getAttendanceStats();

  return (
  
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <AdminHeader/>
      <div className="container mx-auto px-4 py-8">
        {/* --- Page Header --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Attendance Management</h1>
          </div>
          <p className="text-slate-600 text-lg">Mark and track {role} attendance for the selected day.</p>
        </motion.div>

        {/* --- Enhanced Controls Card --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                
                {/* Role Selector */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-gray-700 tracking-wide select-none">Select Role:</label>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleRoleChange("student")}
                      className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md ${role === "student" ? "scale-105 shadow-lg" : "opacity-80 hover:opacity-100"}`}
                    >
                      <GraduationCap className="w-5 h-5" /> Students
                    </Button>
                    <Button
                      onClick={() => handleRoleChange("teacher")}
                      className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md ${role === "teacher" ? "scale-105 shadow-lg" : "opacity-80 hover:opacity-100"}`}
                    >
                      <Users className="w-5 h-5" /> Teachers
                    </Button>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="date-picker" className="text-sm font-semibold text-gray-700 tracking-wide select-none">Select Date:</label>
                  <div className="relative w-48">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      id="date-picker"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                    />
                  </div>
                </div>

                {/* Class Filter (animated visibility) */}
                {role === "student" && (
                  <motion.div initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{duration: 0.5}} className="flex flex-col gap-3">
                    <label htmlFor="class-filter" className="text-sm font-semibold text-gray-700 tracking-wide select-none">Filter by Class:</label>
                    <select
                      id="class-filter"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-48 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
                    >
                      <option value="All">All Classes</option>
                      {studentClasses.map((cls) => (<option key={cls} value={cls}>{cls}</option>))}
                    </select>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- Statistics Section --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[ { key: 'total', label: 'Total', color: 'slate' }, { key: 'present', label: 'Present', color: 'green' }, { key: 'absent', label: 'Absent', color: 'red' }, { key: 'notMarked', label: 'Not Marked', color: 'amber' }].map(stat => (
              <Card key={stat.key} className={`backdrop-blur-md shadow-lg rounded-xl transform transition-transform hover:scale-105 duration-300 bg-${stat.color}-50/70 border-${stat.color}-200`}>
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl font-bold text-${stat.color}-700`}>{stats[stat.key]}</div>
                  <div className={`text-sm font-medium text-${stat.color}-600`}>{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
        
      <AnimatePresence mode="wait">
  {(!list || list.length === 0) ? (
    // --- EMPTY STATE ---
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="min-h-[400px] bg-white/70 border border-slate-300 backdrop-blur-lg flex flex-col justify-center items-center text-center p-8 rounded-2xl shadow-md">
        <div className="text-slate-400 mb-4">
          {role === 'student'
            ? <GraduationCap strokeWidth={1.5} className="w-20 h-20" />
            : <Users strokeWidth={1.5} className="w-20 h-20" />}
        </div>
        <p className="text-slate-600 text-xl mt-2">No {role}s found.</p>
        <p className="text-slate-400 text-sm">Try adjusting the filters or date.</p>
      </Card>
    </motion.div>
  ) : (
    // --- LIST VIEW ---
    <motion.div
      key="list-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
    >
      <Card className="bg-white/80 border border-slate-200 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden">
        <CardHeader className="bg-slate-100 px-6 py-4 border-b border-slate-300">
          <CardTitle className="flex items-center gap-2 text-slate-700">
            {role === 'student'
              ? <GraduationCap className="w-5 h-5 text-cyan-500" />
              : <Users className="w-5 h-5 text-purple-500" />}
            {role.charAt(0).toUpperCase() + role.slice(1)} Roster
            {selectedClass !== 'All' && (
              <Badge variant="outline" className="border-cyan-400/60 text-cyan-500 bg-cyan-100/30">
                {selectedClass}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <motion.div layout className="divide-y divide-slate-200">
            {/* --- HEADER ROW --- */}
            <div className="hidden sm:grid grid-cols-[100px_1fr_120px_auto] items-center gap-13 px-6 py-3 bg-slate-50 text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <p>ID</p>
              <p>Name</p>
              <p>{role === 'student' ? 'Class' : 'Subject'}</p>
              <p className="text-right">Actions</p>
            </div>

            {/* --- ATTENDANCE LIST --- */}
            {list.map((person, index) => {
              const status = attendanceForDate[person.id];

              return (
               <motion.div
  layout="position"
  key={person.id}
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
  className={`grid grid-cols-[100px_1fr_120px_auto] items-center gap-4 px-6 py-4 border-b border-slate-200 
    ${status === 'Present' ? 'bg-green-100/40' : ''}
    ${status === 'Absent' ? 'bg-red-100/40' : 'hover:bg-slate-100/40'}`}
>
  {/* ID */}
  <p className="font-mono text-sm text-slate-500 truncate">{person.id}</p>

  {/* Name */}
  <p className="font-medium text-slate-800 truncate">{person.name}</p>

  {/* Class/Subject */}
  <p className="text-slate-500 truncate">
    {person.class || person.Class || person.subject || 'N/A'}
  </p>

  {/* Attendance Action Buttons */}
  <div className="flex gap-2 justify-end">
    <Button
      size="icon"
      onClick={() => handleAttendance(person.id, 'Present')}
      disabled={status === 'Present'}
      className={`w-10 h-10 rounded-full transition
        ${status === 'Present'
          ? 'bg-green-500 text-white shadow-md cursor-default'
          : 'bg-white text-green-500 border border-green-300 hover:bg-green-100'}`}
    >
      <CheckCircle className="w-5 h-5" />
    </Button>
    <Button
      size="icon"
      onClick={() => handleAttendance(person.id, 'Absent')}
      disabled={status === 'Absent'}
      className={`w-10 h-10 rounded-full transition
        ${status === 'Absent'
          ? 'bg-red-500 text-white shadow-md cursor-default'
          : 'bg-white text-red-500 border border-red-300 hover:bg-red-100'}`}
    >
      <XCircle className="w-5 h-5" />
    </Button>
  </div>
</motion.div>


              );
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )}
</AnimatePresence>


      </div>
    </div>
  );
};

export default AdminAttendance;