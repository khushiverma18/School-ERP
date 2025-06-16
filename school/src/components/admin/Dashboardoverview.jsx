import React, { useState } from 'react';
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// CORRECTED: Removed duplicate 'TrendingUp' and unused icons
import { Users, GraduationCap, Building, DollarSign, TrendingUp, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA DEFINITIONS (UNCHANGED) ---

const summaryData = [
  { title: 'Total Students', value: '4,332', change: '+8.2%', color: 'from-blue-500 to-indigo-600', icon: Users },
  { title: 'Teachers', value: '68', change: '+2.1%', color: 'from-emerald-500 to-teal-600', icon: GraduationCap },
  { title: 'Classes', value: '12', change: '0%', color: 'from-orange-500 to-red-500', icon: Building },
  { title: 'Revenue', value: '₹3,47,000', change: '+12.5%', color: 'from-purple-500 to-pink-600', icon: DollarSign },
];

const pieStats = [
  { name: 'Admission', value: 90, color: '#6366F1' },
  { name: 'Fees Collection', value: 60, color: '#F87171' },
  { name: 'Syllabus', value: 80, color: '#FBBF24' },
  { name: 'Sports', value: 20, color: '#34D399' },
  { name: 'Achievement', value: 80, color: '#3B82F6' },
];

const dailyChartData = [
  { date: 'Dec 19', Student: 180, Teacher: 32 },
  { date: 'Dec 20', Student: 139, Teacher: 50},
  { date: 'Jan 10', Student: 179, Teacher: 41 },
  { date: 'Jan 14', Student: 126, Teacher: 35 },
  { date: 'Jan 20', Student: 90, Teacher: 50 },
  { date: 'Jan 27', Student: 198, Teacher: 45 },
  { date: 'Jan 30', Student: 145, Teacher: 50},
  { date: 'Feb 2', Student:141, Teacher: 38 },
  { date: 'Feb 6', Student: 139, Teacher: 43 },
  { date: 'Feb 12', Student: 145, Teacher: 49 },
  { date: 'Feb 28', Student: 60, Teacher: 48 },
  { date: 'Mar 7', Student: 148, Teacher: 44 },
  { date: 'Mar 17', Student: 146, Teacher: 48 },
];

const serverData = [
  { name: 'Done', value: 60, color: '#3B82F6' },
  { name: 'In Progress', value: 54, color: '#10B981' },
  { name: 'To Do', value: 52, color: '#F59E0B' },
];

const statisticsData = [
  { title: 'Total Students', value: '1,245', period: 'Weekly' },
  { title: 'Classes Conducted', value: '230', period: 'Weekly' },
  { title: 'Attendance Rate', value: '92%', period: 'Weekly' },
];

const tasksData = [
  { title: 'Parent Meeting', subtitle: 'Meet with John’s Parents', time: '9:00 AM' },
  { title: 'Staff Meeting', subtitle: 'Weekly Teacher Briefing', time: '11:00 AM' },
  { title: 'Exam Review', subtitle: 'Review Class 10 Papers', time: '1:00 PM' },
  { title: 'Admission Interview', subtitle: 'New Student Interview', time: '3:00 PM' },
];

// --- CUSTOM COMPACT CALENDAR COMPONENT ---
const CompactCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // Set to June 2025
  const today = new Date();

  const changeMonth = (amount) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: firstDayOfMonth }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <Card className="bg-slate-800 border-slate-700 p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth(-1)} className="text-gray-400 hover:text-white"><ChevronLeft size={20} /></button>
          <button onClick={() => changeMonth(1)} className="text-gray-400 hover:text-white"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {weekDays.map(day => <div key={day} className="text-gray-400 font-medium">{day}</div>)}
        {days.map((day, index) => (
          <div key={index} className="py-1 flex justify-center items-center">
            {day && (
              <span className={`w-8 h-8 flex items-center justify-center rounded-full ${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'bg-blue-600 text-white' : 'text-gray-300'}`}>
                {day}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-slate-300 mt-1">Welcome back to your dashboard</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((item, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">{item.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Breakdown (Pie Chart) */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader><CardTitle className="text-white">Revenue Breakdown</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieStats} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">{pieStats.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
              <div className="grid grid-cols-2 gap-2 mt-4">{pieStats.map((item, index) => <div key={index} className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-sm text-slate-300">{item.name}</span></div>)}</div>
            </CardContent>
          </Card>

          {/* School Performance */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader><CardTitle className="text-white">School Performance</CardTitle><div className="flex space-x-4 text-sm"><span className="text-slate-400">This Year</span><span className="text-slate-400">Last Year</span></div></CardHeader>
            <CardContent>
              <div className="space-y-4"><div><div className="flex justify-between items-center mb-2"><span className="text-sm text-slate-300">RESULT</span><span className="text-sm text-white">85%</span></div><div className="w-full bg-slate-700 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div></div></div><div><div className="flex justify-between items-center mb-2"><span className="text-sm text-slate-300">Sports</span><span className="text-sm text-white">75%</span></div><div className="w-full bg-slate-700 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div></div></div></div>
            </CardContent>
          </Card>

          {/* Course Statistics */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader><CardTitle className="text-white">Course Statistics</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">{serverData.map((server, index) => <div key={index}> <div className="flex justify-between items-center mb-2"><span className="text-xs text-slate-300">{server.name}</span><span className="text-sm text-white">{server.value}%</span></div><div className="w-full bg-slate-700 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${server.value}%`, backgroundColor: server.color }}></div></div></div>)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Attendance Chart */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Daily Attendance Overview</CardTitle>
            <div className="flex space-x-6 mt-2"><div className="flex items-center space-x-2"><div className="w-3 h-1 bg-blue-500 rounded"></div><span className="text-sm text-slate-300">Student</span></div><div className="flex items-center space-x-2"><div className="w-3 h-1 bg-orange-500 rounded"></div><span className="text-sm text-slate-300">Teacher</span></div></div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyChartData}>
                  <defs>
                    <linearGradient id="Student" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient>
                    <linearGradient id="Teacher" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/><stop offset="95%" stopColor="#F97316" stopOpacity={0}/></linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                  <Area type="monotone" dataKey="Student" stroke="#3B82F6" fillOpacity={1} strokeWidth={2} fill="url(#Student)" />
                  <Area type="monotone" dataKey="Teacher" stroke="#F97316" fillOpacity={1} strokeWidth={2} fill="url(#Teacher)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <div className="space-y-6 lg:col-span-1">
            {statisticsData.map((stat, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-5 flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-slate-400 text-xs">{stat.period}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Calendar */}
          <div className="lg:col-span-1"><CompactCalendar /></div>

          {/* Today's Tasks */}
          <div className='lg:col-span-1'>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center">Today's Tasks<Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/20">11</Badge></CardTitle>
                <p className="text-slate-400 text-sm">6 of 11 Completed</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasksData.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3"><Clock className="w-4 h-4 text-slate-400" /><div><p className="text-sm font-medium text-white">{task.title}</p><p className="text-xs text-slate-400">{task.subtitle}</p></div></div>
                      <span className="text-sm text-slate-300">{task.time}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">See All →</button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CORRECTED: Updates card is now inside the main container */}
        <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm p-4 rounded-xl">
          <h4 className="text-lg font-semibold mb-2">Updates</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>Complete the class 12 syllabus in 3 months</li>
            <li>School organized quiz on 17th</li>
            <li>Volleyball tournament on 25th</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;