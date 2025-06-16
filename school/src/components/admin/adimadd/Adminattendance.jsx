import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, GraduationCap, Clock, CheckCircle, XCircle } from 'lucide-react';
import { AppContext } from '../../../context/contexts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminAttendance = () => {
  const { students, teachers, markAttendance, attendanceRecords } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [role, setRole] = useState('student');
  const [selectedClass, setSelectedClass] = useState('All');
  const [attendanceForDate, setAttendanceForDate] = useState({});
  const [listKey, setListKey] = useState(0);

  const studentClasses = [...new Set(students.map(s => s.class || s.Class).filter(Boolean))];
  const filteredStudents = selectedClass === 'All' ? students : students.filter(s => (s.class || s.Class) === selectedClass);
  const list = role === 'student' ? filteredStudents : teachers;

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

  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setRole(newRole);
      setSelectedClass('All');
      setListKey(prevKey => prevKey + 1);
    }
  };

  const handleAttendance = (id, status) => {
    markAttendance(id, date, status);
    setAttendanceForDate(prev => ({ ...prev, [id]: status }));
  };

  const getStatusBadge = (status) => {
    if (status === 'Present') {
      return <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>;
    }
    if (status === 'Absent') {
      return <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">Absent</Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground">Not Marked</Badge>;
  };

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
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Attendance Management</h1>
          </div>
          <p className="text-slate-600 text-lg">Mark and track {role === 'student' ? 'student' : 'teacher'} attendance for today</p>
        </motion.div>

       <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="mb-8"
>
  <Card
    className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 
               shadow-xl transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]"
  >
    <CardContent className="p-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
        
        {/* Role Selector */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="role-selector"
            className="text-sm font-semibold text-gray-700 tracking-wide select-none"
          >
            Select Role:
          </label>
          <div className="flex gap-4">
            <Button
              variant="custom"
              onClick={() => handleRoleChange("student")}
              className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg
                transition-colors duration-400
                bg-gradient-to-r from-blue-500 to-blue-600
                hover:from-blue-600 hover:to-blue-700
                text-white shadow-md
                ${
                  role === "student"
                    ? "scale-105 shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }
                transform transition-transform duration-300
                `}
              style={{ animation: "fadeInUp 0.5s ease forwards" }}
            >
              <GraduationCap className="w-5 h-5" />
              Students
            </Button>
            <Button
              variant="custom"
              onClick={() => handleRoleChange("teacher")}
              className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg
                transition-colors duration-400
                bg-gradient-to-r from-purple-500 to-purple-600
                hover:from-purple-600 hover:to-purple-700
                text-white shadow-md
                ${
                  role === "teacher"
                    ? "scale-105 shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }
                transform transition-transform duration-300
                `}
              style={{ animation: "fadeInUp 0.6s ease forwards" }}
            >
              <Users className="w-5 h-5" />
              Teachers
            </Button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="date-picker"
            className="text-sm font-semibold text-gray-700 tracking-wide select-none"
          >
            Select Date:
          </label>
          <div className="relative w-48">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="date-picker"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600
                         transition duration-300 ease-in-out
                         hover:border-blue-500"
              style={{ animation: "fadeIn 0.8s ease forwards" }}
            />
          </div>
        </div>

        {/* Class Filter (only for students) */}
        {role === "student" && (
          <div className="flex flex-col gap-3">
            <label
              htmlFor="class-filter"
              className="text-sm font-semibold text-gray-700 tracking-wide select-none"
            >
              Filter by Class:
            </label>
            <select
              id="class-filter"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-48 px-4 py-2 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600
                         transition duration-300 ease-in-out
                         hover:border-blue-500"
              style={{ animation: "fadeIn 0.9s ease forwards" }}
            >
              <option value="All">All Classes</option>
              {studentClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </CardContent>

    {/* Extra styles for keyframe animations */}
    <style jsx>{`
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `}</style>
  </Card>
</motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {['total', 'present', 'absent', 'notMarked'].map((key, idx) => (
              <Card key={key} className={`backdrop-blur-md shadow-md rounded-lg ${key === 'present' ? 'bg-green-50 border-green-200' : key === 'absent' ? 'bg-red-50 border-red-200' : key === 'notMarked' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${key === 'present' ? 'text-green-700' : key === 'absent' ? 'text-red-700' : key === 'notMarked' ? 'text-amber-700' : 'text-slate-700'}`}>{stats[key]}</div>
                  <div className={`text-sm ${key === 'present' ? 'text-green-600' : key === 'absent' ? 'text-red-600' : key === 'notMarked' ? 'text-amber-600' : 'text-slate-500'}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {(!list || list.length === 0) ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Card className="bg-white/90 backdrop-blur-md shadow-md rounded-lg">
              <CardContent className="p-12 text-center">
                <div className="text-slate-400 mb-4">
                  {role === 'student' ? <GraduationCap className="w-16 h-16 mx-auto" /> : <Users className="w-16 h-16 mx-auto" />}
                </div>
                <p className="text-slate-600 text-lg">No {role === 'student' ? 'students' : 'teachers'} found.</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} key={listKey}>
            <Card className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {role === 'student' ? <GraduationCap className="w-5 h-5" /> : <Users className="w-5 h-5" />} {role === 'student' ? 'Students' : 'Teachers'} Attendance {selectedClass !== 'All' && <Badge variant="outline">Class: {selectedClass}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {list.map((person, index) => {
                    const status = attendanceForDate[person.id];
                    return (
                      <motion.div key={person.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-100/50 transition-all duration-200 ease-in-out">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-800">{person.name}</h3>
                          <p className="text-sm text-slate-500">{person.class || person.Class || person.subject || 'N/A'}</p>
                          <div className="mt-2">{getStatusBadge(status)}</div>
                        </div>
                        <div className="flex gap-2">
  <Button
    size="sm"
    onClick={() => handleAttendance(person.id, 'Present')}
    disabled={status === 'Present'}
    className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300
      ${status === 'Present' 
        ? 'bg-green-500 text-white shadow-md cursor-default' 
        : 'border border-green-500 text-green-600 hover:bg-green-100 hover:shadow-md'}`}
  >
    <CheckCircle className="w-4 h-4" /> Present
  </Button>
  <Button
    size="sm"
    onClick={() => handleAttendance(person.id, 'Absent')}
    disabled={status === 'Absent'}
    className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300
      ${status === 'Absent' 
        ? 'bg-red-500 text-white shadow-md cursor-default' 
        : 'border border-red-500 text-red-600 hover:bg-red-100 hover:shadow-md'}`}
  >
    <XCircle className="w-4 h-4" /> Absent
  </Button>
</div>

                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendance;
