import React from 'react';
import {
  Calendar,
  GraduationCap,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  Award,
  AlertCircle,
  Info
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer
} from 'recharts';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts';
import {
   Star
} from 'lucide-react';

const DashboardHome = () => {

  const performanceSummary = {
    gpa: '8.9',
    classRank: '5th out of 30',
    improvement: '+0.4 from last term',
    trend: 'up',
  };

  const subjectPerformance = [
    { subject: 'Math', score: 92 },
    { subject: 'Science', score: 88 },
    { subject: 'English', score: 85 },
    { subject: 'History', score: 78 },
    { subject: 'Computer', score: 95 }
  ];

  const examTrends = [
    { exam: 'Term 1', score: 75 },
    { exam: 'Term 2', score: 82 },
    { exam: 'Mid Term', score: 85 },
    { exam: 'Pre-Board', score: 88 },
    { exam: 'Final', score: 91 },
  ];
  const quickStats = [
    {
      title: 'Attendance',
      value: '94.5%',
      progress: 94.5,
      change: '+2.1%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Overall Grade',
      value: 'A-',
      change: '+0.3',
      trend: 'up',
      icon: GraduationCap,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Homework',
      value: '3',
      change: '-2',
      trend: 'down',
      icon: BookOpen,
      color: 'bg-orange-500'
    },
    {
      title: 'Unread Messages',
      value: '5',
      change: '+2',
      trend: 'up',
      icon: MessageSquare,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      title: 'Mathematics Test Result',
      description: 'Your child scored 95% in the recent test',
      time: '2 hours ago',
      icon: Award,
      color: 'text-green-600'
    },
    {
      title: 'Science Homework Due',
      description: 'Chapter 5 exercises due tomorrow',
      time: '5 hours ago',
      icon: BookOpen,
      color: 'text-orange-600'
    },
    {
      title: 'Message from Teacher',
      description: 'Regarding parent-teacher meeting',
      time: '1 day ago',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      title: 'Attendance Alert',
      description: 'Your child was absent yesterday',
      time: '2 days ago',
      icon: AlertCircle,
      color: 'text-red-600'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Parent-Teacher Meeting',
      date: 'Dec 15, 2024',
      time: '3:00 PM',
      type: 'meeting'
    },
    {
      title: 'Science Fair',
      date: 'Dec 20, 2024',
      time: '10:00 AM',
      type: 'event'
    },
    {
      title: 'Math Test',
      date: 'Dec 22, 2024',
      time: '9:00 AM',
      type: 'exam'
    }
  ];

  const attendanceTrendData = [
    { day: 'Mon', value: 92 },
    { day: 'Tue', value: 94 },
    { day: 'Wed', value: 95 },
    { day: 'Thu', value: 93 },
    { day: 'Fri', value: 96 }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Renu mam!</h1>
          <p className="text-blue-100">Here’s what’s happening with Khushi Verma’s academics today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow border">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp
                    className={`h-4 w-4 mr-1 ${
                      stat.trend === 'down' ? 'rotate-180 transform' : ''
                    }`}
                  />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{stat.title}</span>
                {stat.progress && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stat.title} progress</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              {stat.progress && (
                <Progress value={stat.progress} className="mt-3 h-2 bg-gray-100" />
              )}
            </div>
          ))}
        </div>

        {/* Academic Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">GPA</h3>
          <div className="text-3xl font-bold text-green-600">{performanceSummary.gpa}</div>
          <p className="text-sm text-gray-500">Trend: {performanceSummary.improvement}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Class Rank</h3>
          <div className="text-3xl font-bold text-blue-600">{performanceSummary.classRank}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Badge</h3>
          <div className="flex items-center gap-2 mt-2">
            <Star className="text-yellow-500" />
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Excellent</span>
          </div>
        </div>
      </div>


       {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Radar */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Exam Score Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Exam Progression</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={examTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="exam" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                  <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{event.date}</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
                    event.type === 'event' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardHome;
