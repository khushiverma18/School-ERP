import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Download, Edit, GraduationCap, Heart, Users } from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
export function StudentProfile({ isOpen, toggleSidebar }) {
  const studentData = {
    personalInfo: {
      name: "Khushi Verma",
      class: "Class 10",
      rollNo: "15",
      section: "A",
      gender: "Female",
      dateOfBirth: "15th March, 2008",
      bloodGroup: "B+",
      religion: "Hindu",
      nationality: "Indian"
    },
    contactInfo: {
      email: "khushi@student.school.edu",
      phone: "+880 1712-345678",
      address: "House 25, Road 7, Dhanmondi, Dhaka-1205",
      emergencyContact: "+880 1812-987654"
    },
    guardianInfo: {
      fatherName: "Md. Jitender Verma",
      fatherOccupation: "Business Executive",
      fatherPhone: "+880 1712-111222",
      motherName: "Mrs. Renu Verma",
      motherOccupation: "Teacher",
      motherPhone: "+880 1812-333444"
    },
    academicInfo: {
      admissionDate: "1st January, 2019",
      studentId: "STD-2019-0015",
      previousSchool: "Dhaka Residential Model College",
      academicYear: "2024-25",
      house: "Red House"
    }
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
              Student Profile 👧🏻
            </h1>
          </div>
        </div>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Card */}
        <Card className="lg:w-1/3 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-32 w-32 border-4 border-purple-200 shadow-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white text-3xl font-bold">AR</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {studentData.personalInfo.name}
            </CardTitle>
            <div className="flex justify-center gap-2 mt-2">
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                {studentData.personalInfo.class} - {studentData.personalInfo.section}
              </Badge>
              <Badge variant="outline" className="border-purple-300 text-purple-700">
                Roll: {studentData.personalInfo.rollNo}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Student ID: {studentData.academicInfo.studentId}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center gap-2">
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                <Download className="h-4 w-4 mr-2" />
                Download ID
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <GraduationCap className="h-12 w-12 opacity-80" />
                <div>
                  <h3 className="text-xl font-semibold">Academic Year</h3>
                  <p className="text-blue-100">{studentData.academicInfo.academicYear}</p>
                  <p className="text-sm text-blue-200">House: {studentData.academicInfo.house}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-12 w-12 opacity-80" />
                <div>
                  <h3 className="text-xl font-semibold">Admission Date</h3>
                  <p className="text-green-100">{studentData.academicInfo.admissionDate}</p>
                  <p className="text-sm text-green-200">5+ years at school</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Heart className="h-12 w-12 opacity-80" />
                <div>
                  <h3 className="text-xl font-semibold">Blood Group</h3>
                  <p className="text-orange-100">{studentData.personalInfo.bloodGroup}</p>
                  <p className="text-sm text-orange-200">Available for donation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-12 w-12 opacity-80" />
                <div>
                  <h3 className="text-xl font-semibold">Previous School</h3>
                  <p className="text-purple-100 text-sm">{studentData.academicInfo.previousSchool}</p>
                  <p className="text-sm text-purple-200">Transfer student</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <User className="h-6 w-6 text-purple-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Gender</label>
                <p className="text-gray-800 font-medium">{studentData.personalInfo.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="text-gray-800 font-medium">{studentData.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Religion</label>
                <p className="text-gray-800 font-medium">{studentData.personalInfo.religion}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Nationality</label>
                <p className="text-gray-800 font-medium">{studentData.personalInfo.nationality}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <Phone className="h-6 w-6 text-purple-600" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-purple-500" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-800 font-medium">{studentData.contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-purple-500" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-800 font-medium">{studentData.contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-500 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p className="text-gray-800 font-medium">{studentData.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guardian Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Users className="h-6 w-6 text-purple-600" />
            Guardian Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Father's Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-purple-200 pb-2">Father's Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-800 font-medium">{studentData.guardianInfo.fatherName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Occupation</label>
                  <p className="text-gray-800 font-medium">{studentData.guardianInfo.fatherOccupation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-800 font-medium">{studentData.guardianInfo.fatherPhone}</p>
                </div>
              </div>
            </div>

            {/* Mother's Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-purple-200 pb-2">Mother's Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-800 font-medium">{studentData.guardianInfo.motherName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Occupation</label>
                  <p className="text-gray-800 font-medium">{studentData.guardianInfo.motherOccupation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-800 font-medium">{studentData.guardianInfo.motherPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Download className="h-6 w-6 text-purple-600" />
            Documents & Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 border-purple-300 text-purple-700 hover:bg-purple-50 flex flex-col gap-2">
              <Download className="h-6 w-6" />
              <span>Student ID Card</span>
            </Button>
            <Button variant="outline" className="h-20 border-purple-300 text-purple-700 hover:bg-purple-50 flex flex-col gap-2">
              <Download className="h-6 w-6" />
              <span>Birth Certificate</span>
            </Button>
            <Button variant="outline" className="h-20 border-purple-300 text-purple-700 hover:bg-purple-50 flex flex-col gap-2">
              <Download className="h-6 w-6" />
              <span>Previous Records</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
