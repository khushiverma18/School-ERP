import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [enabledModules, setEnabledModules] = useState({
    students: true,
    teachers: true,
    attendance: true,
    events: true,
    results: true,
    reports: true
  });

  const [theme, setTheme] = useState('light');

  const toggleModule = (module) => {
    setEnabledModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const [feeRecords, setFeeRecords] = useState([
    {
      id: 1,
      studentId: 1,
      feeSubmitted: false,
      feeMessage: "Please submit the tuition fee by June 10.",
    },
    {
      id: 2,
      studentId: 2,
      feeSubmitted: true,
      feeMessage: "",
    },
    {
      id: 3,
      studentId: 3,
      feeSubmitted: false,
      feeMessage: "",
    },
    {
      id: 4,
      studentId: 4,
      feeSubmitted: true,
      feeMessage: "",
    },
    {
      id: 5,
      studentId: 5,
      feeSubmitted: true,
      feeMessage: "",
    },
    {
      id: 6,
      studentId: 6,
      feeSubmitted: true,
      feeMessage: "",
    },
    {
      id: 7,
      studentId: 7,
      feeSubmitted: false,
      feeMessage: "",
    },
    {
      id: 8,
      studentId: 8,
      feeSubmitted: true,
      feeMessage: "",
    }
  ]);

  const updateFeeStatus = (studentId, status) => {
    setFeeRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, feeSubmitted: status } : record
      )
    );
  };

  const updateFeeMessage = (studentId, message) => {
    setFeeRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, feeMessage: message } : record
      )
    );
  };

  const [notificationsForParents, setNotificationsForParents] = useState([]);

  const sendParentNotification = (studentId, message) => {
    setNotificationsForParents(prev => [
      ...prev,
      {
        id: Date.now(),
        studentId,
        message,
        date: new Date().toLocaleString()
      }
    ]);
  };

  const tempStudents = [
    { id: 1, name: 'Khushi', Class: '9', email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 2, name: 'Radhika', Class: '10', email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 3, name: 'Priya', Class: '11', email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 4, name: 'Aayush', Class: '12' , email: 'john@example.com', phone: '+1234567890', status: 'Active'},
    { id: 5, name: 'Simmi', Class: '10', email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 6, name: 'Mukesh', Class: '10' , email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 7, name: 'Khushi', Class: '9' , email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 8, name: 'Radhika', Class: '10', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 9, name: 'Muskan', Class: '11', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 10, name: 'Aayush', Class: '12', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 11, name: 'Simmi', Class: '8', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 12, name: 'Vishwash', Class: '8', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 13, name: 'Khushi', Class: '7', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 21, name: 'Radhika', Class: '10', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 31, name: 'Priya', Class: '7', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 41, name: 'Aayush', Class: '12', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 51, name: 'Simmi', Class: '7', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 61, name: 'Monika', Class: '10', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 71, name: 'Khushi', Class: '9', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 81, name: 'Radhika', Class: '10', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 91, name: 'Aniket', Class: '11' , email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 101, name: 'Aayush', Class: '12', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
    { id: 111, name: 'Ayushi', Class: '8' , email: 'john@example.com', phone: '+1234567890', status: 'Active' },
    { id: 121, name: 'Mukesh', Class: '8', email: 'john@example.com', phone: '+1234567890', status: 'Active'  },
  ];

  const tempteach = [
    { id: 100, name: 'Khushi Verma', subject: 'Maths', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 102, name: 'Muskan Malik', subject: 'English', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 103, name: 'Priya Khatana', subject: 'Hindi', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 104, name: 'Aayush Sharwat', subject: 'Geography' , email: 'smith@school.edu', phone: '+1234567893', status: 'Active'},
    { id: 105, name: 'Lokesh Sharma', subject: 'Chemistry', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 106, name: 'Jitender verma', subject: 'Physics', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 107, name: 'Monika Choudhary', subject: 'Art' , email: 'smith@school.edu', phone: '+1234567893', status: 'Active'},
    { id: 108, name: 'Dinesh Chandela', subject: 'Biology', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 109, name: 'Mummta Singh', subject: 'Civices', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 110, name: 'Rupak Sharma', subject: 'History', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 112, name: 'Pankaj Yadav', subject: 'Ecommers', email: 'smith@school.edu', phone: '+1234567893', status: 'Active' },
    { id: 113, name: 'Boby malik', subject: 'Dance' , email: 'smith@school.edu', phone: '+1234567893', status: 'Active'},
  ];


  const defaultResults = [
    { id: 1, studentId: 1, subject: 'Math', marks: 85 },
    { id: 3, studentId: 1, subject: 'Hindi', marks: 80 },
    { id: 2, studentId: 2, subject: 'English', marks: 92 },
  ];

   const tempparent = [
    { id: 1, name: 'Robert Doe', child: 'John Doe', email: 'robert@example.com', phone: '+1234567895', status: 'Active' },
    { id: 2, name: 'Lisa Wilson', child: 'Sarah Wilson', email: 'lisa@example.com', phone: '+1234567896', status: 'Active' },
  ];


  const tempevent=[
    {
      id: '1',
      title: 'Annual Science Fair',
      date: '2024-12-15',
      description: 'Students showcase their innovative science projects',
      type: 'academic'
    },
    {
      id: '2',
      title: 'Sports Day',
      date: '2024-12-20',
      description: 'Inter-house sports competition',
      type: 'sports'
    },
    {
      id: '3',
      title: 'Cultural Festival',
      date: '2024-12-25',
      description: 'Celebration of arts and culture',
      type: 'cultural'
    }
  ];

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [events,setEvents]=useState([])
  const [parents,setParents]=useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [customEvents, setCustomEvents] = useState([]);
  const [results, setResults] = useState(defaultResults);

  const addStudent = (student) => {
    setStudents(prev => [...prev, student]);
  };

  const addTeacher = (teacher) => {
    setTeachers(prev => [...prev, teacher]);
  };


  const addEvent = (newEvent) => {
    const exists = allEvents.some(e => e.title === newEvent.title && e.date === newEvent.date);
    if (!exists) {
      setCustomEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    }
  };

  const addResult = (result) => {
    setResults(prev => [...prev, result]);
  };

  const markAttendance = (studentId, date, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: status
      }
    }));
  };

  const allstudents = [...tempStudents, ...students];
  const allteachers = [...tempteach, ...teachers];
  const allparents=[...tempparent, ...parents];
  const allEvents = [...tempevent, ...events].filter(
    (event, index, self) =>
      index === self.findIndex(e => e.title === event.title && e.date === event.date)
  );

  return (
    <AppContext.Provider value={{
      enabledModules,
      toggleModule,
      theme,
      changeTheme,
      students: allstudents,
      teachers: allteachers,
      parents:allparents,
      attendanceRecords,
      addStudent,
      addTeacher,
      markAttendance,
      events: allEvents,
      addEvent,
      results,
      addResult,
      feeRecords,
      updateFeeStatus,
      updateFeeMessage,
      notificationsForParents,
      sendParentNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
};