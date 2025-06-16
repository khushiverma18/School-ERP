import React from 'react';
import { Users, BookOpen, Calendar, MessageSquare, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';
import { mockData } from '../../services/api';

const TeachDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: mockData.students.length,
      change: '+2.5%',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Classes Today',
      value: '6',
      change: '+0%',
      icon: BookOpen,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pending Homework',
      value: mockData.homework.length,
      change: '-12%',
      icon: Calendar,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'New Messages',
      value: mockData.messages.filter(m => m.unread).length,
      change: '+8%',
      icon: MessageSquare,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const upcomingClasses = mockData.timetable.slice(0, 3);
  const recentMessages = mockData.messages.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow">
  <div className="mb-4 lg:mb-0">
    <h2 className="text-2xl font-semibold text-gray-900">
      Welcome Back, <span className="text-white">Rahul!</span>
    </h2>
    <p className="mt-2 text-gray-700 text-base">
      Your Students completed <span className="text-white font-semibold">80%</span> of the tasks.
    </p>
    <p className="text-base text-white font-medium">Progress is <span className="font-white">very good!</span></p>
  </div>
</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-100`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Today's Schedule
          </h3>
          <div className="space-y-4">
           {upcomingClasses.map((classItem, index) => (
  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
      <BookOpen className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900">{classItem.subject}</p>
      <p className="text-sm text-gray-600">{classItem.class} • {classItem.room}</p>
    </div>
    <div className="text-right">
      <p className="font-medium text-gray-900">{classItem.time}</p>
      <p className="text-sm text-gray-600">{classItem.day}</p>
    </div>
  </div>
))}

          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-purple-500" />
            Recent Messages
          </h3>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-white">
                    {message.parentName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm">{message.parentName}</p>
                  <p className="text-xs text-gray-600 mb-1">{message.studentName}</p>
                  <p className="text-sm text-gray-700 truncate">{message.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                </div>
                {message.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BookOpen className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Assign Homework</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Award className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Enter Marks</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <MessageSquare className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-700">Send Message</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Upcoming Deadlines</h4>
            <p className="text-sm text-yellow-700 mt-1">
              You have 2 homework assignments due this week and 1 exam scheduled for next Monday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachDashboard;