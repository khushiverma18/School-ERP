import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Clock, CheckCircle, AlertCircle, Calendar, FileText, BookOpen } from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function StudentAssignments({ isOpen, toggleSidebar }) {
  const assignments = {
    pending: [
      {
        id: 1,
        title: "Quadratic Equations - Problem Set",
        subject: "Mathematics",
        teacher: "Mr. Ahmed",
        dueDate: "2024-03-20",
        description: "Solve the given quadratic equations using different methods",
        priority: "high",
        estimatedTime: "2 hours",
        attachments: ["question_paper.pdf"]
      },
      {
        id: 2,
        title: "Essay on Climate Change",
        subject: "English",
        teacher: "Ms. Sarah",
        dueDate: "2024-03-25",
        description: "Write a 500-word essay on the impact of climate change",
        priority: "medium",
        estimatedTime: "3 hours",
        attachments: []
      },
      {
        id: 3,
        title: "Lab Report - Chemical Reactions",
        subject: "Chemistry",
        teacher: "Ms. Fatima",
        dueDate: "2024-03-22",
        description: "Complete the lab report for the acid-base reactions experiment",
        priority: "high",
        estimatedTime: "1.5 hours",
        attachments: ["lab_guidelines.pdf", "observation_sheet.docx"]
      }
    ],
    submitted: [
      {
        id: 4,
        title: "Cell Division Diagram",
        subject: "Biology",
        teacher: "Mr. Hasan",
        submittedDate: "2024-03-10",
        dueDate: "2024-03-12",
        status: "graded",
        grade: "A",
        marks: "18/20",
        feedback: "Excellent work! Very detailed diagrams."
      },
      {
        id: 5,
        title: "Motion and Forces Worksheet",
        subject: "Physics",
        teacher: "Dr. Rahman",
        submittedDate: "2024-03-08",
        dueDate: "2024-03-10",
        status: "pending_review",
        grade: null,
        marks: null,
        feedback: null
      }
    ],
    upcoming: [
      {
        id: 6,
        title: "Bangla Literature Analysis",
        subject: "Bangla",
        teacher: "Ms. Rashida",
        assignedDate: "2024-03-18",
        dueDate: "2024-04-02",
        description: "Analyze the themes in the selected poems",
        priority: "low"
      },
      {
        id: 7,
        title: "Historical Timeline Project",
        subject: "Social Studies",
        teacher: "Mr. Karim",
        assignedDate: "2024-03-20",
        dueDate: "2024-04-05",
        description: "Create a timeline of major historical events",
        priority: "medium"
      }
    ]
  };

  const getPriorityColor = (priority) => {
    const colors = {
      "high": "bg-red-100 text-red-800 border-red-300",
      "medium": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "low": "bg-green-100 text-green-800 border-green-300"
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusColor = (status) => {
    const colors = {
      "graded": "bg-green-100 text-green-800",
      "pending_review": "bg-blue-100 text-blue-800",
      "submitted": "bg-purple-100 text-purple-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
             Homework 📕
            </h1>
          </div>
        </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Pending</h3>
                <p className="text-3xl font-bold">{assignments.pending.length}</p>
                <p className="text-sm text-red-100">assignments due</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Submitted</h3>
                <p className="text-3xl font-bold">{assignments.submitted.length}</p>
                <p className="text-sm text-green-100">this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Upcoming</h3>
                <p className="text-3xl font-bold">{assignments.upcoming.length}</p>
                <p className="text-sm text-blue-100">assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <FileText className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Completion</h3>
                <p className="text-3xl font-bold">85%</p>
                <p className="text-sm text-purple-100">success rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({assignments.pending.length})
          </TabsTrigger>
          <TabsTrigger value="submitted" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Submitted ({assignments.submitted.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming ({assignments.upcoming.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.pending.map((assignment) => {
              const daysLeft = getDaysUntilDue(assignment.dueDate);
              return (
                <Card key={assignment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                          {assignment.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-purple-100 text-purple-800">
                            {assignment.subject}
                          </Badge>
                          <Badge className={getPriorityColor(assignment.priority)}>
                            {assignment.priority} priority
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={daysLeft <= 2 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                          {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? "Due today" : "Overdue"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{assignment.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Teacher:</span>
                        <p className="text-gray-600">{assignment.teacher}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Due Date:</span>
                        <p className="text-gray-600">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Estimated Time:</span>
                        <p className="text-gray-600">{assignment.estimatedTime}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Attachments:</span>
                        <p className="text-gray-600">{assignment.attachments.length} files</p>
                      </div>
                    </div>

                    {assignment.attachments.length > 0 && (
                      <div className="space-y-2">
                        <span className="font-medium text-gray-700 text-sm">Attachments:</span>
                        {assignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">{file}</span>
                            <Button variant="outline" size="sm" className="h-8">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Assignment
                      </Button>
                      <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="submitted" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.submitted.map((assignment) => (
              <Card key={assignment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                        {assignment.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          {assignment.subject}
                        </Badge>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status === 'graded' ? 'Graded' : 'Under Review'}
                        </Badge>
                      </div>
                    </div>
                    {assignment.grade && (
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                          {assignment.grade}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{assignment.marks}</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Teacher:</span>
                      <p className="text-gray-600">{assignment.teacher}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Submitted:</span>
                      <p className="text-gray-600">{assignment.submittedDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Due Date:</span>
                      <p className="text-gray-600">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <p className="text-gray-600">
                        {assignment.status === 'graded' ? 'Completed' : 'Pending Review'}
                      </p>
                    </div>
                  </div>

                  {assignment.feedback && (
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <span className="font-medium text-green-800 text-sm">Teacher's Feedback:</span>
                      <p className="text-green-700 text-sm mt-1">{assignment.feedback}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50">
                      <Download className="h-4 w-4 mr-2" />
                      Download Submission
                    </Button>
                    {assignment.status === 'graded' && (
                      <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assignments.upcoming.map((assignment) => (
              <Card key={assignment.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                        {assignment.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          {assignment.subject}
                        </Badge>
                        <Badge className={getPriorityColor(assignment.priority)}>
                          {assignment.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{assignment.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Teacher:</span>
                      <p className="text-gray-600">{assignment.teacher}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Assigned:</span>
                      <p className="text-gray-600">{assignment.assignedDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Due Date:</span>
                      <p className="text-gray-600">{assignment.dueDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Priority:</span>
                      <p className="text-gray-600 capitalize">{assignment.priority}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800 text-sm">
                      This assignment will be available for submission soon. Start preparing early!
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
