import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Coffee, BookOpen, Users, MapPin, Bell, ChevronRight, AlarmClock } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';


// Helper to get a consistent color for subjects
// You can expand this with more subjects
const getSubjectColor = (subject = "") => {
  switch (subject.toLowerCase()) {
    case 'math': return 'border-blue-400';
    case 'english': return 'border-rose-400';
    case 'physics': return 'border-indigo-400';
    case 'chemistry': return 'border-amber-400';
    case 'biology': return 'border-emerald-400';
    default: return 'border-slate-300';
  }
};

// --- DUMMY DATA FOR DEMONSTRATION ---
// In your app, this would come from your context or props
const classSchedule = [
  { day: 'Monday', classes: [ { time: '08:00 - 08:45', subject: 'Math', teacher: 'Mr. Davison' }, { time: '08:45 - 09:30', subject: 'English', teacher: 'Ms. Poem' }, { time: '09:30 - 10:15', subject: 'Physics', teacher: 'Dr. Volt' } ] },
  { day: 'Tuesday', classes: [ /* ... */ ] },
  { day: 'Wednesday', classes: [ /* ... */ ] },
  { day: 'Thursday', classes: [ /* ... */ ] },
  { day: 'Friday', classes: [ /* ... */ ] },
  { day: 'Saturday', classes: [] }, // Example of a day with no classes
  { day: 'Sunday', classes: [] },   // Example of a day with no classes
];
// ------------------------------------

// Animation Variants
const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariants = {
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  hidden: { opacity: 0, y: 20 },
};

const emptyStateVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95 }
}
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


   const today = new Date();
  // (today.getDay() + 6) % 7 makes Monday = 0, Tuesday = 1, ..., Sunday = 6
  const adjustedDay = (today.getDay() + 6) % 7; 
  const todaysSchedule = classSchedule[adjustedDay];
  const hasClasses = todaysSchedule && todaysSchedule.classes.length > 0;

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
      <div className="bg-purple-50/60 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-purple-200/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2.5">
          <AlarmClock className="text-purple-600 h-6 w-6" />
          Today's Schedule
        </h2>
        <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 font-semibold px-3 py-1">
          {todaysSchedule?.day || "Weekend"}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        {hasClasses ? (
          // --- STATE WITH CLASSES ---
          <motion.ul
            key="class-list"
            className="space-y-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {todaysSchedule.classes.map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className={`flex items-center gap-4 p-3 bg-white/70 rounded-lg border-l-4 ${getSubjectColor(item.subject)}`}
              >
                <div className="text-left">
                  <p className="font-semibold text-slate-800">{item.subject}</p>
                  <p className="text-sm text-slate-500">{item.teacher}</p>
                </div>
                <div className="ml-auto text-right text-sm font-medium text-purple-700">
                  {item.time}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          // --- EMPTY STATE WHEN THERE ARE NO CLASSES ---
          <motion.div
            key="no-classes"
            variants={emptyStateVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <div className="flex items-center justify-center h-16 w-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4">
              <Coffee className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Time to Recharge!</h3>
            <p className="text-slate-500 mt-1 max-w-xs">
              There are no classes scheduled for today. Enjoy your break!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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