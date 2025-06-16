import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../../context/contexts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Download, Brain, TrendingUp, Users, AlertTriangle, Award } from 'lucide-react';

const AIReportGenerator = () => {
  const { students, attendanceRecords, results } = useContext(AppContext);

  // Calculate analytics data
  const analyticsData = useMemo(() => {
    // Attendance analysis
    const attendanceAlerts = students
      .map(student => {
        const records = attendanceRecords[student.id];
        const totalDays = records ? Object.keys(records).length : 0;
        const presentDays = records
          ? Object.values(records).filter(status => status === 'Present').length
          : 0;
        const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;
        return {
          name: student.name,
          class: student.Class,
          attendance: attendanceRate,
          status: attendanceRate < 75 ? 'Low Attendance' : 'Good',
        };
      });

    // Performance analysis
    const performanceData = students.map(student => {
      const studentResults = results.filter(r => r.studentId === student.id);
      const totalMarks = studentResults.reduce((sum, r) => sum + r.marks, 0);
      const avg = studentResults.length ? totalMarks / studentResults.length : 0;
      return { 
        name: student.name, 
        class: student.Class, 
        average: Number(avg.toFixed(2)),
        totalSubjects: studentResults.length
      };
    });

    // Class performance
    const classPerformance = students.reduce((acc, student) => {
      const studentResults = results.filter(r => r.studentId === student.id);
      const avg = studentResults.length ? 
        studentResults.reduce((sum, r) => sum + r.marks, 0) / studentResults.length : 0;
      
      if (!acc[student.Class]) {
        acc[student.Class] = { class: student.Class, totalAvg: 0, count: 0 };
      }
      acc[student.Class].totalAvg += avg;
      acc[student.Class].count += 1;
      return acc;
    }, {});

    const classData = Object.values(classPerformance).map(item => ({
      class: item.class,
      average: Number((item.totalAvg / item.count).toFixed(2))
    }));

    // Subject performance
    const subjectPerformance = results.reduce((acc, result) => {
      if (!acc[result.subject]) {
        acc[result.subject] = { subject: result.subject, totalMarks: 0, count: 0 };
      }
      acc[result.subject].totalMarks += result.marks;
      acc[result.subject].count += 1;
      return acc;
    }, {});

    const subjectData = Object.values(subjectPerformance).map(item => ({
      subject: item.subject,
      average: Number((item.totalMarks / item.count).toFixed(2))
    }));

    return {
      attendanceAlerts: attendanceAlerts.filter(item => item.status === 'Low Attendance'),
      performanceData: performanceData.sort((a, b) => b.average - a.average),
      classData,
      subjectData,
      totalStudents: students.length,
      lowAttendanceCount: attendanceAlerts.filter(item => item.status === 'Low Attendance').length
    };
  }, [students, attendanceRecords, results]);

  const generatePDF = async () => {
    const jsPDF = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;
    
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('🏫 School Performance Report 2024', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    let yPosition = 45;

    // Executive Summary
    doc.setFontSize(16);
    doc.text('📊 Executive Summary', 14, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.text(`Total Students: ${analyticsData.totalStudents}`, 14, yPosition);
    yPosition += 6;
    doc.text(`Students with Low Attendance: ${analyticsData.lowAttendanceCount}`, 14, yPosition);
    yPosition += 6;
    doc.text(`Average School Performance: ${analyticsData.performanceData.reduce((sum, s) => sum + s.average, 0) / analyticsData.performanceData.length || 0}%`, 14, yPosition);
    yPosition += 15;

    // Low Attendance Alerts
    if (analyticsData.attendanceAlerts.length > 0) {
      doc.setFontSize(14);
      doc.text('⚠️ Attendance Alerts', 14, yPosition);
      yPosition += 10;

      autoTable(doc, {
        startY: yPosition,
        head: [['Student Name', 'Class', 'Attendance Rate', 'Status']],
        body: analyticsData.attendanceAlerts.map(s => [
          s.name, 
          s.class, 
          s.attendance.toFixed(1) + '%', 
          s.status
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [220, 53, 69] }
      });
      yPosition = doc.lastAutoTable.finalY + 15;
    }

    // Top Performers
    const top5 = analyticsData.performanceData.slice(0, 5);
    doc.setFontSize(14);
    doc.text('🏆 Top 5 Academic Performers', 14, yPosition);
    yPosition += 10;

    autoTable(doc, {
      startY: yPosition,
      head: [['Rank', 'Student Name', 'Class', 'Average Score']],
      body: top5.map((s, index) => [
        (index + 1).toString(), 
        s.name, 
        s.class, 
        s.average + '%'
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [40, 167, 69] }
    });
    yPosition = doc.lastAutoTable.finalY + 15;

    // Class Performance
    doc.setFontSize(14);
    doc.text('📚 Class Performance Overview', 14, yPosition);
    yPosition += 10;

    autoTable(doc, {
      startY: yPosition,
      head: [['Class', 'Average Performance']],
      body: analyticsData.classData.map(c => [c.class, c.average + '%']),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [13, 110, 253] }
    });

    doc.save('School_AI_Report_2024.pdf');
  };

  const chartConfig = {
    average: {
      label: "Average Score",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI-Powered School Analytics
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Comprehensive insights and automated reporting for academic excellence
          </p>
          <Button 
            onClick={generatePDF} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Generate AI Report PDF
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Students</p>
                  <p className="text-3xl font-bold">{analyticsData.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Top Performer</p>
                  <p className="text-lg font-bold">{analyticsData.performanceData[0]?.average || 0}%</p>
                  <p className="text-xs text-green-100">{analyticsData.performanceData[0]?.name}</p>
                </div>
                <Award className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Attendance Alerts</p>
                  <p className="text-3xl font-bold">{analyticsData.lowAttendanceCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">School Average</p>
                  <p className="text-3xl font-bold">
                    {Math.round(analyticsData.performanceData.reduce((sum, s) => sum + s.average, 0) / analyticsData.performanceData.length || 0)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Class Performance Chart */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Class Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.classData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="average" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Subject Performance Chart */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Subject Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.subjectData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="subject" type="category" width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="average" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Top Academic Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.performanceData.slice(0, 5).map((student, index) => (
                  <div key={student.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">Class {student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-yellow-600">{student.average}%</p>
                      <p className="text-xs text-gray-500">{student.totalSubjects} subjects</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Alerts */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Attendance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analyticsData.attendanceAlerts.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.attendanceAlerts.map((student) => (
                    <div key={student.name} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">Class {student.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-red-600">{student.attendance.toFixed(1)}%</p>
                        <p className="text-xs text-red-500">Low Attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600">No attendance alerts! All students are maintaining good attendance.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIReportGenerator;
