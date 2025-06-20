
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import { Navigate } from 'react-router-dom';
import NotFound from "./pages/notfound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAttendance from "./components/admin/adimadd/Adminattendance";
import AdminStudents from "./components/admin/adimadd/Adminstudent";
import AdminTeacher from "./components/admin/adimadd/Adminteacher";
import AdminEvents from "./components/admin/adimadd/Adminevent";
import AIReportGenerator from "./components/admin/adimadd/Adminreport";
import AdminResults from "./components/admin/adimadd/Adminresults";
import AdminPanel from "./components/admin/Adminadd";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { StudentProfile } from "./components/student/Profile";
import { StudentTimetable } from "./components/student/Timetable";
import { StudentAttendance } from "./components/student/Attendance";
import { StudentResults } from "./components/student/Examresult";
import { StudentAssignments } from "./components/student/Homework";
import { StudentMaterials } from "./components/student/Studymaterials";
import { StudentCommunication } from "./components/student/Communication";
import StudentLayout from "./pages/studentlayout";
import ParentDashboard from './pages/ParentDashboard';
import DashboardHome from "./components/parent/DashboardHome";
import ChildProfile from "./components/parent/ChildProfile";
import Attendance from "./components/parent/Attendance";
import ExamResults from "./components/parent/ExamResults";
import Homework from "./components/parent/Homework";
import StudyMaterials from "./components/parent/StudyMaterials";
import Communication from "./components/parent/Communication";
import FeePayment from "./components/parent/FeePayment";
import Reports from "./components/parent/Reports";
import Settings from "./components/parent/Settings";
import StudentSettings from "./components/student/Setting";
import AdminSettings from "./components/admin/Setting";
import AlumniManagement from "./components/admin/AlumniManagement";
import AnalyticsReports from "./components/admin/AnalyticsReport";
import AttendanceReports from "./components/admin/Attendence";
import ChatCenter from "./components/admin/ChatCenter";
import EventsManagement from "./components/admin/Events";
import FeeManagement from "./components/admin/FeeManagement";
import UserManagement from "./components/admin/userManag";
import TimetableManagement from "./components/admin/Timetable";
import Dashboard from "./components/admin/Dashboardoverview";
import TeacherDashboard from "./pages/TeacherDashboard";
import ClassTimetable from "./components/teacher/ClassTimetable";
import TeacherProfile from "./components/teacher/TeacherProfile";
import StudyMate from "./components/teacher/StudyMaterials";
import StudentOverview from "./components/teacher/StudentOverview";
import StudentAttendances from "./components/teacher/StudentAttendance";
import HomeworkManager from "./components/teacher/HomeworkManager";
import ExamResult from "./components/teacher/ExamResults";
import ExamManagement from "./components/teacher/ExamManagement";
import TeachDashboard from "./components/teacher/Dashboard";
import Communications from "./components/teacher/Communication";
import TeacherSettings from "./components/teacher/Setting";
import { SocketProvider } from './context/SocketContext';
import {AuthProvider} from './context/AuthContext';
import UniformDeliveryModule from "./components/parent/Deliver";
import Game from "./components/student/Game";
import Hero from "./components/Hero";
import WhySection from "./components/whySection";
import FeaturesSection from "./components/Feature";
import AudienceSection from "./components/Audiencesection";
import CTASection from "./components/Ctasection";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
        <AuthProvider>

     <SocketProvider> 
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public + Admin Routes */}
          <Route path="/" element={<Index />} />

          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="Add" element={<AdminPanel />} />
            <Route path="Alumni" element={<AlumniManagement />} />
            <Route path="Analytics" element={<AnalyticsReports />} />
            <Route path="Timetable" element={<TimetableManagement />} />
            <Route path="ChatCenter" element={<ChatCenter />} />
            <Route path="Events" element={<EventsManagement />} />
            <Route path="ExamResults" element={<ExamResults />} />
            <Route path="FeeManagement" element={<FeeManagement />} />
            <Route path="UserManagement" element={<UserManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="student" element={<AdminStudents />} />
            <Route path="teachers" element={<AdminTeacher />} />
            <Route path="attendance" element={<AttendanceReports />} />
            <Route path="reports" element={<AIReportGenerator />} />
          </Route>



          <Route path="/admin/panal" element={<AdminPanel />} />
          <Route path="/admin/student" element={<AdminStudents />} />
          <Route path="/admin/teachers" element={<AdminTeacher />} />
          <Route path="/admin/attendances" element={<AdminAttendance />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/result" element={<AdminResults />} />
          <Route path="/admin/reports" element={<AIReportGenerator />} />




          {/* ✅ Student Layout + Nested Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="timetable" element={<StudentTimetable />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="materials" element={<StudentMaterials />} />
            <Route path="communication" element={<StudentCommunication />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route path="Game" element={<Game/>} />
          </Route>


          <Route path="/parent" element={<ParentDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<ChildProfile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="results" element={<ExamResults />} />
            <Route path="homework" element={<Homework />} />
            <Route path="materials" element={<StudyMaterials />} />
            <Route path="communication" element={<Communication />} />
            <Route path="deliver" element={<UniformDeliveryModule/>} />
            <Route path="fees" element={<FeePayment />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>



          <Route path="/Teacher" element={<TeacherDashboard />}>
            <Route index element={<TeachDashboard />} />
            <Route path="ClassTime" element={<ClassTimetable />} />
            <Route path="Communication" element={<Communications />} />
            <Route path="DashBoard" element={<TeachDashboard />} />
            <Route path="ExamManagment" element={<ExamManagement />} />
            <Route path="ExamResult" element={<ExamResult />} />
            <Route path="Homework" element={<HomeworkManager />} />
            <Route path="StudentAttendence" element={<StudentAttendances />} />
            <Route path="StudentOver" element={<StudentOverview />} />
            <Route path="StudyMaterial" element={<StudyMate />} />
            <Route path="TeacherProfile" element={<TeacherProfile />} />
            <Route path="Setting" element={<TeacherSettings />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
 </SocketProvider> 
     </AuthProvider>

  </QueryClientProvider>
);

export default App;