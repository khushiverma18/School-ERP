import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, BookOpen, Trophy, TrendingUp, Bell, CheckCircle, AlertCircle } from "lucide-react";
import { ChevronLeft, ChevronRight, CircleDot, } from 'lucide-react';
import studentHero from '../../assets/sudentHero.png';
<style>
{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .float-animation {
    animation: float 3s ease-in-out infinite;
  }
`}
</style>
export function StudentDashboard({ isOpen, toggleSidebar }) {
  const todaySchedule = [
    { time: "8:00-8:45", subject: "Mathematics", teacher: "Mr. Ahmed", room: "Room 201" },
    { time: "8:45-9:30", subject: "English", teacher: "Ms. Sarah", room: "Room 105" },
    { time: "10:00-10:45", subject: "Physics", teacher: "Dr. Rahman", room: "Lab 1" },
    { time: "10:45-11:30", subject: "Chemistry", teacher: "Ms. Fatima", room: "Lab 2" },
  ];

  const recentActivities = [
    { type: "assignment", title: "Mathematics Assignment submitted", time: "2 hours ago", status: "completed" },
    { type: "result", title: "Physics test result published", time: "1 day ago", status: "new" },
    { type: "announcement", title: "Sports Day announcement", time: "2 days ago", status: "info" },
    { type: "material", title: "New Chemistry notes uploaded", time: "3 days ago", status: "new" }
  ];

  const quickStats = {
    attendance: 92,
    assignments: { completed: 15, pending: 3, total: 18 },
    gpa: 4.2,
    rank: 3
  };

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="w-full rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-8 mb-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 -mt-6 -mr-6 opacity-20">
         <img src="https://cdn-icons-png.flaticon.com/512/2645/2645897.png" alt="decoration" className="absolute top-6 left-12 w-10 float-animation" />
         </div>
  <div className="absolute top-0 right-0 w-48 h-48 -mt-6 -mr-6 opacity-20">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2645/2645897.png"
      alt="decoration"
      className="w-full h-full"
    />

  </div>
         <button
    onClick={toggleSidebar}
    className="p-2 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
  >
    {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
  </button>
          <div className="flex flex-col md:flex-row items-center justify-between z-10 relative">
    <div className="space-y-2">
            <h1 className="text-[#1e2139] text-4xl  font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent">
              Welcome back, Khushi! 👋
            </h1>
            <p className="text-white">Let's make today productive and successful!</p>
          </div>
            <div className="w-100% h-36 mt-7 md:mt-0 relative p-2 rounded-xl shadow-md bg-white/20 backdrop-blur-sm">
      <img 
        src={studentHero} 
        alt="student-avatar" 
        className="w-full h-full object-contain bg-transparent rounded-xl drop-shadow-lg rounded-full"
      />
    </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Attendance</h3>
                <p className="text-3xl font-bold">{quickStats.attendance}%</p>
                <p className="text-sm text-blue-100">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Assignments</h3>
                <p className="text-3xl font-bold">{quickStats.assignments.completed}/{quickStats.assignments.total}</p>
                <p className="text-sm text-green-100">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Trophy className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Current GPA</h3>
                <p className="text-3xl font-bold">{quickStats.gpa}</p>
                <p className="text-sm text-purple-100">Excellent!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Trophy className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Class Rank</h3>
                <p className="text-3xl font-bold">#{quickStats.rank}</p>
                <p className="text-sm text-orange-100">Keep it up!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

 {/* Charts and Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject Performance */}
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Subject Performance</h3>
          <div className="flex items-end justify-between h-32 px-4">
            <div className="w-6 bg-indigo-300 h-12 rounded-lg"></div>
            <div className="w-6 bg-green-300 h-20 rounded-lg"></div>
            <div className="w-6 bg-orange-300 h-16 rounded-lg"></div>
            <div className="w-6 bg-purple-300 h-24 rounded-lg"></div>
            <div className="w-6 bg-red-400 h-28 rounded-lg"></div>
             <div className="w-6 bg-orange-400 h-28 rounded-lg"></div>
              <div className="w-6 bg-black h-18 rounded-lg"></div>
               <div className="w-6 bg-blue-400 h-25 rounded-lg"></div>
                <div className="w-6 bg-yellow-300 h-18 rounded-lg"></div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-3xl bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <CircleDot className="text-purple-500" />
                <div>
                  <p className="font-medium">Math Assignment</p>
                  <p className="text-sm text-gray-500">due tomorrow</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-pink-500 text-white">DUE</span>
            </div>
            <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <CircleDot className="text-indigo-500" />
                <div>
                  <p className="font-medium">New announcement</p>
                  <p className="text-sm text-gray-500">posted</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-200 text-indigo-900">1</span>
            </div>
          </div>
        </div>
        </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Schedule */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Calendar className="h-6 w-6 text-purple-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-purple-100 text-purple-800">{item.time}</Badge>
                        <h4 className="font-semibold text-gray-800">{item.subject}</h4>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>👨‍🏫 {item.teacher}</p>
                        <p>📍 {item.room}</p>
                      </div>
                    </div>
                    <BookOpen className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                View Full Timetable
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Bell className="h-6 w-6 text-purple-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-gradient-to-r from-white to-purple-50 border border-purple-100 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-100' :
                      activity.status === 'new' ? 'bg-blue-100' : 'bg-yellow-100'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : activity.status === 'new' ? (
                        <Bell className="h-4 w-4 text-blue-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Progress & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Assignment Progress */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <BookOpen className="h-6 w-6 text-purple-600" />
              Assignment Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Completed Assignments</span>
                <span className="text-sm text-gray-600">{quickStats.assignments.completed}/{quickStats.assignments.total}</span>
              </div>
              <Progress 
                value={(quickStats.assignments.completed / quickStats.assignments.total) * 100} 
                className="h-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                {quickStats.assignments.pending} assignments pending
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Upcoming Deadlines</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-sm text-gray-800">Math Assignment</span>
                  <Badge className="bg-red-100 text-red-800">Due Tomorrow</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-sm text-gray-800">English Essay</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Due in 3 days</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Clock className="h-6 w-6 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">View Timetable</span>
              </Button>
              
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm">Submit Assignment</span>
              </Button>
              
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0">
                <Trophy className="h-6 w-6" />
                <span className="text-sm">View Results</span>
              </Button>
              
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Study Materials</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
   
  );
}
