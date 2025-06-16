import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, XCircle, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function StudentAttendance({ isOpen, toggleSidebar }) {
  const attendanceData = {
    overall: {
      totalDays: 180,
      presentDays: 162,
      absentDays: 18,
      percentage: 90
    },
    monthly: [
      { month: "January", present: 20, absent: 2, total: 22, percentage: 91 },
      { month: "February", present: 18, absent: 1, total: 19, percentage: 95 },
      { month: "March", present: 21, absent: 1, total: 22, percentage: 95 }
    ],
    subjectWise: [
      { subject: "Mathematics", present: 45, total: 50, percentage: 90 },
      { subject: "English", present: 47, total: 50, percentage: 94 },
      { subject: "Physics", present: 44, total: 48, percentage: 92 },
      { subject: "Chemistry", present: 43, total: 48, percentage: 90 },
      { subject: "Biology", present: 46, total: 48, percentage: 96 },
      { subject: "Bangla", present: 42, total: 45, percentage: 93 }
    ],
    recentAttendance: [
      { date: "2024-03-01", status: "present", subjects: ["Math", "English", "Physics"] },
      { date: "2024-03-02", status: "present", subjects: ["Chemistry", "Biology", "Bangla"] },
      { date: "2024-03-03", status: "absent", subjects: [], reason: "Sick leave" },
      { date: "2024-03-04", status: "present", subjects: ["Math", "English", "ICT"] },
      { date: "2024-03-05", status: "present", subjects: ["Physics", "Chemistry", "PE"] }
    ]
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 95) return "text-green-600 bg-green-100";
    if (percentage >= 85) return "text-blue-600 bg-blue-100";
    if (percentage >= 75) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 95) return "bg-green-500";
    if (percentage >= 85) return "bg-blue-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 min-h-screen ">
      <div className="flex items-center gap-4">
          <button
    onClick={toggleSidebar}
    className="p-2 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
  >
    {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
  </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
             Attendance 📝
            </h1>
          </div>
        </div>
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Present Days</h3>
                <p className="text-3xl font-bold">{attendanceData.overall.presentDays}</p>
                <p className="text-sm text-green-100">out of {attendanceData.overall.totalDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <XCircle className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Absent Days</h3>
                <p className="text-3xl font-bold">{attendanceData.overall.absentDays}</p>
                <p className="text-sm text-red-100">needs improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Attendance Rate</h3>
                <p className="text-3xl font-bold">{attendanceData.overall.percentage}%</p>
                <p className="text-sm text-blue-100">excellent performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Trend</h3>
                <p className="text-3xl font-bold">↗</p>
                <p className="text-sm text-purple-100">improving monthly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Attendance */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Calendar className="h-6 w-6 text-purple-600" />
            Monthly Attendance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {attendanceData.monthly.map((month, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">{month.month}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Present</span>
                    <Badge className="bg-green-100 text-green-800">{month.present} days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Absent</span>
                    <Badge variant="outline" className="border-red-300 text-red-800">{month.absent} days</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Percentage</span>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(month.percentage)}`}>
                        {month.percentage}%
                      </span>
                    </div>
                    <Progress value={month.percentage} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Attendance */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            Subject-wise Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendanceData.subjectWise.map((subject, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-br from-white to-purple-50 border border-purple-200 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-800">{subject.subject}</h4>
                  <Badge className={getStatusColor(subject.percentage)}>
                    {subject.percentage}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Present: {subject.present}</span>
                    <span>Total: {subject.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(subject.percentage)}`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Attendance */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Clock className="h-6 w-6 text-purple-600" />
            Recent Attendance (Last 5 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.recentAttendance.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white to-purple-50 border border-purple-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${day.status === 'present' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {day.status === 'present' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{day.date}</p>
                    <p className={`text-sm ${day.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>
                      {day.status === 'present' ? 'Present' : 'Absent'}
                    </p>
                    {day.reason && (
                      <p className="text-xs text-gray-500">Reason: {day.reason}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {day.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {day.subjects.map((subject, subIndex) => (
                        <Badge key={subIndex} variant="outline" className="text-xs border-purple-300 text-purple-700">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs border-red-300 text-red-700">
                      No classes attended
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
