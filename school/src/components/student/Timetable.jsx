import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, BookOpen, Users, MapPin, Bell, ChevronRight, AlarmClock } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function StudentTimetable({ isOpen, toggleSidebar }) {
  const classSchedule = [
    { day: "Monday", classes: [
      { time: "8:00-8:45", subject: "Mathematics", teacher: "Mr. Ahmed", room: "Room 201", type: "regular" },
      { time: "8:45-9:30", subject: "English", teacher: "Ms. Sarah", room: "Room 105", type: "regular" },
      { time: "9:30-10:00", subject: "Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "10:00-10:45", subject: "Physics", teacher: "Dr. Rahman", room: "Lab 1", type: "regular" },
      { time: "10:45-11:30", subject: "Chemistry", teacher: "Ms. Fatima", room: "Lab 2", type: "regular" },
      { time: "11:30-12:15", subject: "Biology", teacher: "Mr. Hasan", room: "Lab 3", type: "regular" },
      { time: "12:15-1:00", subject: "Lunch Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "1:00-1:45", subject: "Bangla", teacher: "Ms. Rashida", room: "Room 102", type: "regular" },
      { time: "1:45-2:30", subject: "Social Studies", teacher: "Mr. Karim", room: "Room 204", type: "regular" }
    ]},
    { day: "Tuesday", classes: [
      { time: "8:00-8:45", subject: "English", teacher: "Ms. Sarah", room: "Room 105", type: "regular" },
      { time: "8:45-9:30", subject: "Mathematics", teacher: "Mr. Ahmed", room: "Room 201", type: "regular" },
      { time: "9:30-10:00", subject: "Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "10:00-10:45", subject: "Biology", teacher: "Mr. Hasan", room: "Lab 3", type: "regular" },
      { time: "10:45-11:30", subject: "Physics", teacher: "Dr. Rahman", room: "Lab 1", type: "regular" },
      { time: "11:30-12:15", subject: "ICT", teacher: "Mr. Sabbir", room: "Computer Lab", type: "regular" },
      { time: "12:15-1:00", subject: "Lunch Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "1:00-1:45", subject: "Art & Craft", teacher: "Ms. Nazia", room: "Art Room", type: "regular" },
      { time: "1:45-2:30", subject: "Physical Education", teacher: "Mr. Rafi", room: "Playground", type: "regular" }
    ]},
    { day: "Wednesday", classes: [
      { time: "8:00-8:45", subject: "Mathematics", teacher: "Mr. Ahmed", room: "Room 201", type: "regular" },
      { time: "8:45-9:30", subject: "Bangla", teacher: "Ms. Rashida", room: "Room 102", type: "regular" },
      { time: "9:30-10:00", subject: "Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "10:00-10:45", subject: "Social Studies", teacher: "Mr. Karim", room: "Room 204", type: "regular" },
      { time: "10:45-11:30", subject: "Biology", teacher: "Mr. Hasan", room: "Lab 3", type: "regular" },
      { time: "11:30-12:15", subject: "English", teacher: "Ms. Sarah", room: "Room 105", type: "regular" },
      { time: "12:15-1:00", subject: "Lunch Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "1:00-1:45", subject: "Physics", teacher: "Dr. Rahman", room: "Lab 1", type: "regular" },
      { time: "1:45-2:30", subject: "Chemistry", teacher: "Ms. Fatima", room: "Lab 2", type: "regular" }
    ]},
    { day: "Thursday", classes: [
      { time: "8:00-8:45", subject: "Physics", teacher: "Dr. Rahman", room: "Lab 1", type: "regular" },
      { time: "8:45-9:30", subject: "Chemistry", teacher: "Ms. Fatima", room: "Lab 2", type: "regular" },
      { time: "9:30-10:00", subject: "Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "10:00-10:45", subject: "English", teacher: "Ms. Sarah", room: "Room 105", type: "regular" },
      { time: "10:45-11:30", subject: "Mathematics", teacher: "Mr. Ahmed", room: "Room 201", type: "regular" },
      { time: "11:30-12:15", subject: "Social Studies", teacher: "Mr. Karim", room: "Room 204", type: "regular" },
      { time: "12:15-1:00", subject: "Lunch Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "1:00-1:45", subject: "ICT", teacher: "Mr. Sabbir", room: "Computer Lab", type: "regular" },
      { time: "1:45-2:30", subject: "Bangla", teacher: "Ms. Rashida", room: "Room 102", type: "regular" }
    ]},
    { day: "Friday", classes: [
      { time: "8:00-8:45", subject: "Biology", teacher: "Mr. Hasan", room: "Lab 3", type: "regular" },
      { time: "8:45-9:30", subject: "Art & Craft", teacher: "Ms. Nazia", room: "Art Room", type: "regular" },
      { time: "9:30-10:00", subject: "Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "10:00-10:45", subject: "Physical Education", teacher: "Mr. Rafi", room: "Playground", type: "regular" },
      { time: "10:45-11:30", subject: "Mathematics", teacher: "Mr. Ahmed", room: "Room 201", type: "regular" },
      { time: "11:30-12:15", subject: "Physics", teacher: "Dr. Rahman", room: "Lab 1", type: "regular" },
      { time: "12:15-1:00", subject: "Lunch Break", teacher: "", room: "Cafeteria", type: "break" },
      { time: "1:00-1:45", subject: "English", teacher: "Ms. Sarah", room: "Room 105", type: "regular" },
      { time: "1:45-2:30", subject: "Chemistry", teacher: "Ms. Fatima", room: "Lab 2", type: "regular" }
    ]}
  ];

  const examSchedule = [
    { date: "2024-03-15", day: "Monday", time: "9:00-12:00", subject: "Mathematics", type: "Final Exam", room: "Hall A" },
    { date: "2024-03-17", day: "Wednesday", time: "9:00-12:00", subject: "English", type: "Final Exam", room: "Hall B" },
    { date: "2024-03-19", day: "Friday", time: "9:00-12:00", subject: "Physics", type: "Final Exam", room: "Hall A" },
    { date: "2024-03-21", day: "Sunday", time: "9:00-12:00", subject: "Chemistry", type: "Final Exam", room: "Hall C" },
    { date: "2024-03-23", day: "Tuesday", time: "9:00-12:00", subject: "Biology", type: "Final Exam", room: "Hall B" },
    { date: "2024-03-25", day: "Thursday", time: "9:00-12:00", subject: "Bangla", type: "Final Exam", room: "Hall A" }
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      "Mathematics": "bg-blue-100 text-blue-800 border-blue-300",
      "English": "bg-green-100 text-green-800 border-green-300",
      "Physics": "bg-purple-100 text-purple-800 border-purple-300",
      "Chemistry": "bg-orange-100 text-orange-800 border-orange-300",
      "Biology": "bg-teal-100 text-teal-800 border-teal-300",
      "Bangla": "bg-pink-100 text-pink-800 border-pink-300",
      "Social Studies": "bg-indigo-100 text-indigo-800 border-indigo-300",
      "ICT": "bg-cyan-100 text-cyan-800 border-cyan-300",
      "Art & Craft": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "Physical Education": "bg-red-100 text-red-800 border-red-300"
    };
    return colors[subject] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  // Get current day index (0-6, Sunday-Saturday)
  const currentDayIndex = new Date().getDay();
  // Adjust to match your schedule (Monday is index 0 in your array)
  const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
  const currentDaySchedule = classSchedule[adjustedDayIndex]?.classes || [];

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
            My Timetable 🕰️
          </h1>
          <p className="text-sm text-gray-500">View your class and exam schedules</p>
        </div>
      </div>

      {/* Today's Classes Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlarmClock className="text-purple-600 h-5 w-5" />
            Today's Classes
          </h2>
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            {classSchedule[adjustedDayIndex]?.day || "No classes today"}
          </Badge>
        </div>
        
        {currentDaySchedule.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentDaySchedule.map((classItem, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  classItem.type === 'break' 
                    ? 'bg-gray-50 border-gray-300' 
                    : getSubjectColor(classItem.subject)
                } transition-all duration-200 hover:shadow-md flex flex-col`}
              >
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs bg-white/80">
                    {classItem.time}
                  </Badge>
                  {classItem.type !== 'break' && (
                    <Badge variant="outline" className="text-xs bg-white/80">
                      {classItem.type === 'regular' ? 'Class' : classItem.type}
                    </Badge>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{classItem.subject}</h4>
                {classItem.teacher && (
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" /> {classItem.teacher}
                  </p>
                )}
                {classItem.room && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {classItem.room}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No classes scheduled for today
          </div>
        )}
      </div>

      <Tabs defaultValue="class-schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="class-schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Weekly Schedule
          </TabsTrigger>
          <TabsTrigger value="exam-schedule" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Exam Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="class-schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {classSchedule.map((daySchedule, index) => (
              <Card 
                key={index} 
                className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === adjustedDayIndex ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <CardHeader className="pb-3 border-b border-gray-100">
                  <CardTitle className="text-lg font-bold text-center">
                    <span className={`${
                      index === adjustedDayIndex 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                        : "text-gray-700"
                    }`}>
                      {daySchedule.day}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  {daySchedule.classes.map((classItem, classIndex) => (
                    <div
                      key={classIndex}
                      className={`p-3 rounded-lg border-l-4 ${
                        classItem.type === 'break' 
                          ? 'bg-gray-50 border-gray-300' 
                          : getSubjectColor(classItem.subject)
                      } transition-all duration-200 hover:shadow-sm`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3 w-3 text-gray-600" />
                        <span className="text-xs font-medium text-gray-600">{classItem.time}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-800 mb-1">{classItem.subject}</h4>
                      {classItem.teacher && (
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{classItem.teacher}</span>
                        </div>
                      )}
                      {classItem.room && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-600">{classItem.room}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exam-schedule" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examSchedule.map((exam, index) => (
              <Card 
                key={index} 
                className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Decorative stripe */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-pink-500"></div>
                
                <CardHeader className="pl-6">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      {exam.type}
                    </Badge>
                    <span className="text-sm text-gray-600">{exam.day}</span>
                  </div>
                  <CardTitle className="text-xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {exam.subject}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pl-6">
                  <div className="flex items-center gap-3 text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">{exam.date}</p>
                      <p className="text-xs text-gray-500">Exam Date</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">{exam.time}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600 p-2 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">{exam.room}</p>
                      <p className="text-xs text-gray-500">Location</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400 flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-800 font-medium">
                      Remember to bring your admit card and required stationery
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4 border-purple-300 text-purple-600 hover:bg-purple-50">
                    Set Reminder <AlarmClock className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}