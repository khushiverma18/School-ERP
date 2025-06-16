import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://erp-at85.onrender.com/api'
    : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👇 Use Axios instead of fetch
export const authAPI = {
  login: ({ email, password }) =>
    api.post('/auth/login', { email, password }),
};

export default api; // 👈 Exporting axios instance for reuse (optional)

// const API_BASE_URL = process.env.NODE_ENV === 'development' 
//   ? 'http://localhost:3001/api' 
//   : '/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Teacher API calls
export const teacherAPI = {
  // Attendance
  markAttendance: (teacherId, attendanceData) =>
    apiCall(`/teacher/${teacherId}/attendance`, {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    }),

  getAttendance: (teacherId, classId, date) =>
    apiCall(`/teacher/${teacherId}/attendance?class=${classId}&date=${date}`),

  updateAttendance: (teacherId, attendanceId, data) =>
    apiCall(`/teacher/${teacherId}/attendance/${attendanceId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Homework
  assignHomework: (teacherId, homeworkData) =>
    apiCall(`/teacher/${teacherId}/homework`, {
      method: 'POST',
      body: JSON.stringify(homeworkData),
    }),

  getHomework: (teacherId, classId) =>
    apiCall(`/teacher/${teacherId}/homework?class=${classId}`),

  updateHomework: (teacherId, homeworkId, data) =>
    apiCall(`/teacher/${teacherId}/homework/${homeworkId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Exams
  createExam: (teacherId, examData) =>
    apiCall(`/teacher/${teacherId}/exams`, {
      method: 'POST',
      body: JSON.stringify(examData),
    }),

  enterMarks: (teacherId, examId, marks) =>
    apiCall(`/teacher/${teacherId}/exams/${examId}/marks`, {
      method: 'POST',
      body: JSON.stringify(marks),
    }),

  // Study Materials
  uploadMaterial: (teacherId, materialData) =>
    apiCall(`/teacher/${teacherId}/materials`, {
      method: 'POST',
      body: JSON.stringify(materialData),
    }),

  // Timetable
  getTimetable: (teacherId) =>
    apiCall(`/teacher/${teacherId}/timetable`),

  updateTimetable: (teacherId, timetableData) =>
    apiCall(`/teacher/${teacherId}/timetable`, {
      method: 'PUT',
      body: JSON.stringify(timetableData),
    }),

  // Students
  getStudents: (teacherId, classId) =>
    apiCall(`/teacher/${teacherId}/students?class=${classId}`),

  getStudentDetails: (teacherId, studentId) =>
    apiCall(`/teacher/${teacherId}/students/${studentId}`),

  // Communication
  getMessages: (teacherId, parentId) =>
    apiCall(`/teacher/${teacherId}/messages?parent=${parentId}`),

  sendMessage: (teacherId, messageData) =>
    apiCall(`/teacher/${teacherId}/messages`, {
      method: 'POST',
      body: JSON.stringify(messageData),
    }),
};

// Mock data for development
export const mockData = {
  students: [
    {
      id: 'STU001',
      name: 'John Smith',
      rollNumber: '001',
      class: 'Class 10A',
      parentName: 'Robert Smith',
      parentPhone: '+1 234-567-8901',
      email: 'john.smith@email.com',
      attendance: 85,
      averageGrade: 'A-'
    },
    {
      id: 'STU002',
      name: 'Emma Davis',
      rollNumber: '002',
      class: 'Class 10A',
      parentName: 'Michael Davis',
      parentPhone: '+1 234-567-8902',
      email: 'emma.davis@email.com',
      attendance: 92,
      averageGrade: 'A'
    },
    {
      id: 'STU003',
      name: 'Alex Johnson',
      rollNumber: '003',
      class: 'Class 9B',
      parentName: 'Sarah Johnson',
      parentPhone: '+1 234-567-8903',
      email: 'alex.johnson@email.com',
      attendance: 78,
      averageGrade: 'B+'
    }
  ],

  timetable: [
    { day: 'Monday', time: '09:00-10:00', subject: 'Mathematics', class: 'Class 10A', room: 'Room 101' },
    { day: 'Monday', time: '10:00-11:00', subject: 'Physics', class: 'Class 9B', room: 'Room 201' },
    { day: 'Tuesday', time: '09:00-10:00', subject: 'Mathematics', class: 'Class 9B', room: 'Room 101' },
    { day: 'Tuesday', time: '11:00-12:00', subject: 'Physics', class: 'Class 10A', room: 'Room 201' },
    { day: 'Wednesday', time: '09:00-10:00', subject: 'Mathematics', class: 'Class 10A', room: 'Room 101' },
    { day: 'Thursday', time: '10:00-11:00', subject: 'Physics', class: 'Class 9B', room: 'Room 201' },
    { day: 'Friday', time: '09:00-10:00', subject: 'Mathematics', class: 'Class 9B', room: 'Room 101' }
  ],

  homework: [
    {
      id: 'HW001',
      subject: 'Mathematics',
      class: 'Class 10A',
      title: 'Quadratic Equations Practice',
      description: 'Solve problems 1-20 from Chapter 4',
      dueDate: '2024-01-15',
      attachments: ['worksheet.pdf'],
      status: 'active'
    },
    {
      id: 'HW002',
      subject: 'Physics',
      class: 'Class 9B',
      title: 'Newton\'s Laws Lab Report',
      description: 'Complete the lab report based on today\'s experiment',
      dueDate: '2024-01-18',
      attachments: ['lab_template.docx'],
      status: 'active'
    }
  ],

  exams: [
    {
      id: 'EX001',
      subject: 'Mathematics',
      class: 'Class 10A',
      title: 'Mid-term Examination',
      date: '2024-01-20',
      totalMarks: 100,
      duration: '3 hours',
      status: 'upcoming'
    },
    {
      id: 'EX002',
      subject: 'Physics',
      class: 'Class 9B',
      title: 'Unit Test - Mechanics',
      date: '2024-01-25',
      totalMarks: 50,
      duration: '1.5 hours',
      status: 'upcoming'
    }
  ],

  messages: [
    {
      id: 'MSG001',
      parentName: 'Robert Smith',
      studentName: 'John Smith',
      lastMessage: 'Thank you for the update on John\'s progress.',
      timestamp: '2024-01-10 14:30',
      unread: false
    },
    {
      id: 'MSG002',
      parentName: 'Michael Davis',
      studentName: 'Emma Davis',
      lastMessage: 'Could we schedule a meeting to discuss Emma\'s performance?',
      timestamp: '2024-01-10 16:45',
      unread: true
    }
  ]
};
 
