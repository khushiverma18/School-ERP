import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Attendance Rate",
    value: "91%",
    color: "blue",
    icon: "📅",
    trend: "+5%",
    bgGradient: "from-blue-50 to-blue-100",
    textColor: "text-blue-700",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "Avg Performance",
    value: "B+",
    color: "green",
    icon: "📊",
    trend: "+2%",
    bgGradient: "from-green-50 to-green-100",
    textColor: "text-green-700",
    iconBg: "bg-green-500/10",
  },
  {
    title: "Upcoming Events",
    value: "3",
    color: "amber",
    icon: "🗓️",
    trend: "2 new",
    bgGradient: "from-amber-50 to-amber-100",
    textColor: "text-amber-700",
    iconBg: "bg-amber-500/10",
  },
  {
    title: "Tasks Due",
    value: "5",
    color: "red",
    icon: "✅",
    trend: "urgent",
    bgGradient: "from-red-50 to-red-100",
    textColor: "text-red-700",
    iconBg: "bg-red-500/10",
  },
];

const quickActions = [
  { to: "/admin/teachers", title: "Add Teacher", icon: "👨‍🏫", bgColor: "bg-blue-600 hover:bg-blue-700" },
  { to: "/admin/student", title: "Add Student", icon: "👨‍🎓", bgColor: "bg-green-600 hover:bg-green-700" },
  { to: "/admin/events", title: "Schedule Event", icon: "📅", bgColor: "bg-amber-500 hover:bg-amber-600" },
];

const featureModules = [
  { to: "/admin/student", title: "Add Student", desc: "Quickly add a new student to the system", icon: "👨‍🎓", color: "text-blue-600" },
  { to: "/admin/teachers", title: "Add Teacher", desc: "Register new teaching staff members", icon: "👨‍🏫", color: "text-green-600" },
  { to: "/admin/attendances", title: "Record Attendance", desc: "Track daily student attendance records", icon: "📋", color: "text-purple-600" },
  { to: "/admin/result", title: "Upload Results", desc: "Manage and upload exam results", icon: "📈", color: "text-orange-600" },
  { to: "/admin/events", title: "Schedule Events", desc: "Create and organize school events", icon: "🎉", color: "text-pink-600" },
  { to: "/admin/reports", title: "View Reports", desc: "Generate comprehensive school reports", icon: "📊", color: "text-cyan-600" },
];

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 text-lg">Welcome back! Here's what's happening at your school today.</p>
            </div>
            <Badge variant="secondary" className="hidden sm:flex items-center gap-2 px-4 py-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Online
            </Badge>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={action.to}
                  className={`${action.bgColor} px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl`}
                >
                  <span className="text-xl">{action.icon}</span>
                  {action.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-slate-700 mb-6">School Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className={`bg-gradient-to-br ${item.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-slate-600 font-medium text-sm mb-1">{item.title}</p>
                        <h3 className={`text-3xl font-bold ${item.textColor} mb-2`}>{item.value}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {item.trend}
                        </Badge>
                      </div>
                      <div className={`${item.iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                    </div>
                    <div className={`h-1 mt-4 bg-gradient-to-r from-${item.color}-300 to-${item.color}-500 rounded-full opacity-60`} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature Modules */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2"> Feature Modules</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Access all the tools you need to manage your school efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureModules.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group"
              >
                <Link to={item.to} className="block h-full">
                  <Card className="h-full bg-white hover:bg-gradient-to-br hover:from-white hover:to-slate-50 transition-all duration-300 border-slate-200 hover:border-slate-300 shadow-md hover:shadow-xl">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-200 transition-colors duration-300">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <h3 className={`text-xl font-semibold ${item.color} group-hover:text-slate-800 transition-colors duration-300`}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 flex-1">
                        {item.desc}
                      </p>
                      <div className="mt-4 text-sm text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                        Click to access →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminPanel;
