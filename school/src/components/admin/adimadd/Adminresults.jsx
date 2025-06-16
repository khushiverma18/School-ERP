import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../../../context/contexts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Users, BookOpen, Trophy, GraduationCap } from "lucide-react";

const AdminResults = () => {
  const { students, addResult } = useContext(AppContext);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [term, setTerm] = useState('');

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Memoize the list of unique classes available from students
  const availableClasses = useMemo(() => {
    if (!students || students.length === 0) return [];
    const classSet = new Set();
    students.forEach(student => {
      const studentClass = student.Class || student.class;
      if (studentClass) {
        classSet.add(studentClass);
      }
    });
    return Array.from(classSet).sort();
  }, [students]);

  // Memoize the list of students filtered by the selected class
  const filteredStudents = useMemo(() => {
    if (!selectedClass || !students) return [];
    return students.filter(student => (student.Class || student.class) === selectedClass);
  }, [selectedClass, students]);

  // Effect to reset student selection if the class changes
  useEffect(() => {
    if (selectedStudent && selectedClass) {
      const studentExistsInClass = filteredStudents.some(s => s.id.toString() === selectedStudent);
      if (!studentExistsInClass) {
        setSelectedStudent('');
      }
    }
  }, [selectedClass, selectedStudent, filteredStudents]);

 const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!selectedClass || !selectedStudent || !subject.trim() || !marks.trim() || !term.trim()) {
      setError("All fields are required to add a student result.");
      return;
    }

    const marksValue = parseInt(marks, 10);
    if (isNaN(marksValue) || marksValue < 0 || marksValue > 100) {
      setError("Marks must be a number between 0 and 100.");
      return;
    }

    const newResult = {
      id: Date.now().toString(),
      studentId: parseInt(selectedStudent, 10),
      class: selectedClass,
      subject: subject.trim(),
      term: term.trim(),
      marks: marksValue
    };

    addResult(newResult);
    
    // Reset form fields (except class)
    setSelectedStudent('');
    setSubject('');
    setMarks('');
    setTerm('');
    setSuccessMessage(`Result for "${subject.trim()}" added successfully!`);

    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Student Results Management
          </h1>
          <p className="text-gray-600 text-lg">
            Add and manage student academic results efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Available Classes</p>
                  <p className="text-2xl font-bold">{availableClasses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Active Session</p>
                  <p className="text-2xl font-bold">2024</p>
                </div>
                <GraduationCap className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 font-medium">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Form Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-indigo-600" />
              Add Student Result
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class Selection */}
               <div className="space-y-2">
  <Label htmlFor="selectClass" className="text-sm font-semibold text-gray-700">
    Select Class <span className="text-red-500">*</span>
  </Label>
  <Select
    value={selectedClass}
    onValueChange={(value) => {
      setSelectedClass(value);
      setSelectedStudent('');
      setError('');
    }}
  >
    <SelectTrigger className="h-12 px-4 border border-gray-300 rounded-lg shadow-sm hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all text-gray-700">
      <SelectValue  placeholder="Choose a class" />
    </SelectTrigger>
    <SelectContent className="z-[9999] bg-white rounded-lg shadow-lg border border-gray-200">
  {availableClasses.map(cls => (
    <SelectItem
      key={cls}
      value={cls}
      className="py-2 px-4 hover:bg-indigo-100 text-gray-800 transition-colors rounded-md cursor-pointer"
    >
      Class {cls}
    </SelectItem>
  ))}
</SelectContent>

  </Select>
</div>


                {/* Student Selection */}
                <div className="space-y-2">
                  <Label htmlFor="selectStudent" className="text-sm font-semibold text-gray-700">
                    Select Student <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={selectedStudent}
                    onValueChange={setSelectedStudent}
                    disabled={!selectedClass || filteredStudents.length === 0}
                  >
                    <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100">
                      <SelectValue placeholder={!selectedClass ? "Select class first" : "Choose a student"} />
                    </SelectTrigger>
                    <SelectContent className= "z-[9999] bg-white rounded-lg shadow-lg border border-gray-200">
                      {filteredStudents.map(student => (
                        <SelectItem key={student.id} value={student.id.toString()} className="py-3">
                          {student.name} (ID: {student.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedClass && filteredStudents.length === 0 && (
                    <p className="text-sm text-gray-500">No students found in this class</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Mathematics, Science, English"
                    className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                
                {/* Term */}
                <div className="space-y-2">
                  <Label htmlFor="term" className="text-sm font-semibold text-gray-700">
                    Term/Exam <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="term"
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="e.g., Midterm, Final, Unit Test 1"
                    className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                {/* Marks */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="marks" className="text-sm font-semibold text-gray-700">
                    Marks Obtained <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="marks"
                    type="number"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="Enter marks (0-100)"
                    min="0"
                    max="100"
                    className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 max-w-xs"
                  />
                  <p className="text-sm text-gray-500">Enter marks out of 100</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Add Result
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminResults;
