import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Download, TrendingUp, TrendingDown, Award, BarChart3, FileText } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function StudentResults({ isOpen, toggleSidebar }) {
  const examResults = [
    {
      examName: "Final Examination 2024",
      examDate: "March 2024",
      totalMarks: 600,
      obtainedMarks: 524,
      percentage: 87.3,
      grade: "A+",
      position: 3,
      subjects: [
        { name: "Mathematics", fullMarks: 100, obtained: 92, grade: "A+", gpa: 5.0 },
        { name: "English", fullMarks: 100, obtained: 85, grade: "A", gpa: 4.0 },
        { name: "Physics", fullMarks: 100, obtained: 88, grade: "A+", gpa: 5.0 },
        { name: "Chemistry", fullMarks: 100, obtained: 82, grade: "A", gpa: 4.0 },
        { name: "Biology", fullMarks: 100, obtained: 95, grade: "A+", gpa: 5.0 },
        { name: "Bangla", fullMarks: 100, obtained: 82, grade: "A", gpa: 4.0 }
      ]
    },
    {
      examName: "Mid-term Examination 2024",
      examDate: "January 2024",
      totalMarks: 600,
      obtainedMarks: 498,
      percentage: 83.0,
      grade: "A",
      position: 5,
      subjects: [
        { name: "Mathematics", fullMarks: 100, obtained: 88, grade: "A+", gpa: 5.0 },
        { name: "English", fullMarks: 100, obtained: 78, grade: "A-", gpa: 3.5 },
        { name: "Physics", fullMarks: 100, obtained: 85, grade: "A", gpa: 4.0 },
        { name: "Chemistry", fullMarks: 100, obtained: 79, grade: "A-", gpa: 3.5 },
        { name: "Biology", fullMarks: 100, obtained: 92, grade: "A+", gpa: 5.0 },
        { name: "Bangla", fullMarks: 100, obtained: 76, grade: "A-", gpa: 3.5 }
      ]
    }
  ];

  const performanceAnalysis = {
    strongSubjects: ["Biology", "Mathematics", "Physics"],
    weakSubjects: ["English", "Chemistry"],
    improvement: {
      trend: "improving",
      percentage: 4.3
    },
    classRank: 3,
    totalStudents: 45
  };

  const getGradeColor = (grade) => {
    const colors = {
      "A+": "bg-green-500 text-white",
      "A": "bg-blue-500 text-white",
      "A-": "bg-cyan-500 text-white",
      "B+": "bg-yellow-500 text-white",
      "B": "bg-orange-500 text-white",
      "C": "bg-red-500 text-white"
    };
    return colors[grade] || "bg-gray-500 text-white";
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 min-h-screen">
     <div className="flex items-center gap-4">
         <button
    onClick={toggleSidebar}
    className="p-2 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
  >
    {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
  </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Result 🧾
            </h1>
          </div>
        </div>
      {/* Overall Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Trophy className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Current Grade</h3>
                <p className="text-3xl font-bold">A+</p>
                <p className="text-sm text-green-100">Excellent performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Award className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Class Rank</h3>
                <p className="text-3xl font-bold">{performanceAnalysis.classRank}</p>
                <p className="text-sm text-blue-100">out of {performanceAnalysis.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-12 w-12 opacity-80" />
              <div>
                <h3 className="text-xl font-semibold">Latest Score</h3>
                <p className="text-3xl font-bold">87.3%</p>
                <p className="text-sm text-purple-100">Final Exam 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {performanceAnalysis.improvement.trend === "improving" ? (
                <TrendingUp className="h-12 w-12 opacity-80" />
              ) : (
                <TrendingDown className="h-12 w-12 opacity-80" />
              )}
              <div>
                <h3 className="text-xl font-semibold">Improvement</h3>
                <p className="text-3xl font-bold">+{performanceAnalysis.improvement.percentage}%</p>
                <p className="text-sm text-orange-100">from last exam</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="results" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exam Results
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          {examResults.map((exam, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      {exam.examName}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{exam.examDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getGradeColor(exam.grade)} size="lg">
                      Grade {exam.grade}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">Position: {exam.position}</p>
                    <Button variant="outline" size="sm" className="mt-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-800">Total Marks</h4>
                    <p className="text-2xl font-bold text-blue-600">{exam.obtainedMarks}/{exam.totalMarks}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-800">Percentage</h4>
                    <p className="text-2xl font-bold text-green-600">{exam.percentage}%</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-800">Grade</h4>
                    <p className="text-2xl font-bold text-purple-600">{exam.grade}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-purple-200 pb-2">Subject-wise Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exam.subjects.map((subject, subIndex) => (
                      <div key={subIndex} className="p-4 rounded-lg bg-gradient-to-br from-white to-purple-50 border border-purple-200 hover:shadow-md transition-all duration-200">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-semibold text-gray-800">{subject.name}</h5>
                          <Badge className={getGradeColor(subject.grade)} size="sm">
                            {subject.grade}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Marks: {subject.obtained}/{subject.fullMarks}</span>
                            <span className={getPerformanceColor((subject.obtained/subject.fullMarks) * 100)}>
                              {((subject.obtained/subject.fullMarks) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={(subject.obtained/subject.fullMarks) * 100} className="h-2" />
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-700">GPA: {subject.gpa}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strong Subjects */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Strong Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceAnalysis.strongSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <span className="font-medium text-gray-800">{subject}</span>
                      <Badge className="bg-green-500 text-white">Excellent</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceAnalysis.weakSubjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                      <span className="font-medium text-gray-800">{subject}</span>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">Needs Focus</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Recommendation:</strong> Spend extra time on these subjects and consider seeking help from teachers or tutors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart Placeholder */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                Performance Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Interactive chart showing performance trends over time</p>
                  <p className="text-sm mt-2">Coming soon with detailed analytics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
