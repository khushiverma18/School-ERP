import React, { useState } from 'react';
// Import motion and AnimatePresence for animations
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Edit, Trash2, Clock } from 'lucide-react';

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Each cell animates in with a slight delay
    },
  },
  exit: {
    opacity: 0,
    transition: {
        staggerChildren: 0.03,
        staggerDirection: -1, // Animate out in reverse
    }
  }
};

const cellVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
  exit: { scale: 0.8, opacity: 0 }
};

// A helper function to assign colors to subjects
const getSubjectStyle = (subject) => {
  switch (subject.toLowerCase()) {
    case 'math': return { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-200' };
    case 'english': return { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-200' };
    case 'physics': return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' };
    case 'chemistry': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' };
    case 'biology': return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' };
    case 'pe': return { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-200' };
    case 'history': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' };
    case 'geography': return { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200' };
    default: return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };
  }
};

const TimetableManagement = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');

  const timeSlots = ['08:00', '08:45', '09:30', '10:15', '11:00', '11:45'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Dummy data - in a real app, this would change when `selectedClass` changes
  const timetable = {
    '10-A': { 'Monday': ['Math', 'English', 'Physics', 'Chemistry', 'Biology', 'PE'], 'Tuesday': ['English', 'Math', 'History', 'Geography', 'Art', 'Music'], 'Wednesday': ['Physics', 'Chemistry', 'Math', 'English', 'Computer', 'Library'], 'Thursday': ['Biology', 'Math', 'English', 'Physics', 'Chemistry', 'Study'], 'Friday': ['Math', 'English', 'Geography', 'History', 'PE', 'Assembly']},
    '10-B': { 'Monday': ['History', 'Geography', 'PE', 'English', 'Math', 'Art'], 'Tuesday': ['Physics', 'Chemistry', 'Biology', 'Math', 'English', 'Music'], 'Wednesday': ['Math', 'English', 'Study', 'Computer', 'History', 'Geography'], 'Thursday': ['PE', 'Library', 'Math', 'English', 'Physics', 'Chemistry'], 'Friday': ['Assembly', 'Art', 'English', 'Math', 'Biology', 'History']},
    '9-A': { 'Monday': ['Math', 'Science', 'Social', 'English', 'Language', 'PE'], 'Tuesday': ['English', 'Math', 'Science', 'Social', 'Art', 'Music'], 'Wednesday': ['Science', 'Social', 'Math', 'English', 'Computer', 'Library'], 'Thursday': ['Language', 'Math', 'English', 'Science', 'Social', 'Study'], 'Friday': ['Math', 'English', 'Social', 'Science', 'PE', 'Assembly']},
    '9-B': { 'Monday': ['Social', 'Science', 'Math', 'Language', 'English', 'PE'], 'Tuesday': ['Language', 'Math', 'Social', 'Science', 'Music', 'Art'], 'Wednesday': ['Math', 'English', 'Science', 'Social', 'Library', 'Computer'], 'Thursday': ['Science', 'Social', 'English', 'Math', 'Study', 'Language'], 'Friday': ['English', 'Math', 'PE', 'Social', 'Science', 'Assembly']},
  };
  
  const currentTimetable = timetable[selectedClass];

  return (
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
            <h1 className="text-3xl font-bold text-slate-800">Class Timetable</h1>
            <p className="text-slate-500 mt-1">View and manage schedules for each class.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 flex items-center space-x-2 font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Schedule</span>
          </motion.button>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 space-y-6">
          <div className="flex items-center gap-4">
            <label htmlFor="class-select" className="text-sm font-semibold text-slate-700">Select Class:</label>
            <select
              id="class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-slate-300 rounded-lg px-4 py-2 bg-slate-50 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
            >
              <option value="10-A">Grade 10-A</option>
              <option value="10-B">Grade 10-B</option>
              <option value="9-A">Grade 9-A</option>
              <option value="9-B">Grade 9-B</option>
            </select>
          </div>

          {/* Timetable Grid */}
          <div className="overflow-x-auto">
            {/* AnimatePresence handles the transition when the selectedClass changes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClass} // This key is crucial for AnimatePresence to detect changes
                className="grid grid-cols-[auto_repeat(5,1fr)] gap-2 min-w-[700px]"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Top-left empty cell */}
                <div className="p-2"> <Clock className="mx-auto h-6 w-6 text-slate-400" /> </div> 
                
                {/* Day Headers */}
                {days.map(day => (
                  <motion.div key={day} variants={cellVariants} className="p-3 text-center font-bold text-slate-700 bg-slate-100 rounded-lg">{day}</motion.div>
                ))}

                {/* Time Slots and Subject Cells */}
                {timeSlots.map((time, timeIndex) => (
                  <React.Fragment key={time}>
                    {/* Time Slot Header */}
                    <motion.div variants={cellVariants} className="p-3 flex items-center justify-center font-semibold text-sm text-slate-600 bg-slate-100 rounded-lg">
                      {time}
                    </motion.div>
                    
                    {/* Subject Cells for the row */}
                    {days.map(day => {
                      const subject = currentTimetable[day][timeIndex];
                      const style = getSubjectStyle(subject);
                      return (
                        <motion.div
                          key={`${day}-${time}`}
                          variants={cellVariants}
                          whileHover={{ scale: 1.05, zIndex: 10, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                          className={`relative group p-4 rounded-lg cursor-pointer transition-shadow ${style.bg}`}
                        >
                          <div className={`font-bold text-sm ${style.text}`}>{subject}</div>
                          <div className="text-xs text-slate-500">{`Teacher ${timeIndex + 1}`}</div>
                          
                          {/* Hover Actions */}
                          <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button title="Edit Slot" className="p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:text-indigo-600 hover:bg-white transition-all"><Edit className="h-3.5 w-3.5" /></button>
                            <button title="Delete Slot" className="p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-600 hover:bg-white transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimetableManagement;