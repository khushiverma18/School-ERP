import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/contexts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, User, Phone, Mail, Calendar, MapPin, Heart, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdminStudents = () => {
  const { addStudent } = useContext(AppContext);
  const { toast } = useToast();

  const [student, setStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    admissionNumber: '',
    dob: '',
    gender: '',
    address: '',
    contact: '',
    email: '',
    parentName: '',
    parentContact: '',
    bloodGroup: '',
    healthIssues: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!student.name.trim()) newErrors.name = 'Name is required';
    if (!student.class.trim()) newErrors.class = 'Class is required';
    if (!student.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!student.admissionNumber.trim()) newErrors.admissionNumber = 'Admission number is required';
    if (student.email && !/\S+@\S+\.\S+/.test(student.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (student.contact && !/^\d{10}$/.test(student.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Contact must be 10 digits';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    addStudent({ 
      id: Date.now(), 
      ...student,
      Class: student.class // Ensure compatibility with existing context
    });
    
    setStudent({
      name: '',
      class: '',
      section: '',
      rollNumber: '',
      admissionNumber: '',
      dob: '',
      gender: '',
      address: '',
      contact: '',
      email: '',
      parentName: '',
      parentContact: '',
      bloodGroup: '',
      healthIssues: '',
    });
    
    setErrors({});
    
    toast({
      title: "Success!",
      description: `Student ${student.name} has been added successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Student Registration
          </h1>
          <p className="text-gray-600 text-lg">Add new student to the school management system</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <User className="w-6 h-6" />
              Student Information
            </CardTitle>
            <CardDescription className="text-blue-100">
              Fill in the student details below. Required fields are marked with *
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleAdd} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Personal Information
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={student.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob" className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={student.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-medium">
                      Gender
                    </Label>
                    <select
                      id="gender"
                      name="gender"
                      value={student.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-sm font-medium flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      Blood Group
                    </Label>
                    <Input
                      id="bloodGroup"
                      name="bloodGroup"
                      value={student.bloodGroup}
                      onChange={handleChange}
                      placeholder="e.g., O+"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Academic Information
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="class" className="text-sm font-medium">
                      Class *
                    </Label>
                    <Input
                      id="class"
                      name="class"
                      value={student.class}
                      onChange={handleChange}
                      placeholder="e.g., 10A"
                      className={errors.class ? "border-red-500" : ""}
                    />
                    {errors.class && <p className="text-red-500 text-xs">{errors.class}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section" className="text-sm font-medium">
                      Section
                    </Label>
                    <Input
                      id="section"
                      name="section"
                      value={student.section}
                      onChange={handleChange}
                      placeholder="e.g., A"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-sm font-medium">
                      Roll Number *
                    </Label>
                    <Input
                      id="rollNumber"
                      name="rollNumber"
                      value={student.rollNumber}
                      onChange={handleChange}
                      placeholder="e.g., 001"
                      className={errors.rollNumber ? "border-red-500" : ""}
                    />
                    {errors.rollNumber && <p className="text-red-500 text-xs">{errors.rollNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admissionNumber" className="text-sm font-medium">
                      Admission Number *
                    </Label>
                    <Input
                      id="admissionNumber"
                      name="admissionNumber"
                      value={student.admissionNumber}
                      onChange={handleChange}
                      placeholder="e.g., ADM2024001"
                      className={errors.admissionNumber ? "border-red-500" : ""}
                    />
                    {errors.admissionNumber && <p className="text-red-500 text-xs">{errors.admissionNumber}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Contact Information
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-sm font-medium flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      Contact Number
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={student.contact}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      className={errors.contact ? "border-red-500" : ""}
                    />
                    {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={student.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentName" className="text-sm font-medium">
                      Parent/Guardian Name
                    </Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={student.parentName}
                      onChange={handleChange}
                      placeholder="Enter parent name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentContact" className="text-sm font-medium">
                      Parent Contact
                    </Label>
                    <Input
                      id="parentContact"
                      name="parentContact"
                      value={student.parentContact}
                      onChange={handleChange}
                      placeholder="Parent phone number"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={student.address}
                      onChange={handleChange}
                      placeholder="Enter complete address"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Health Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-red-100 text-red-700">
                    Health Information
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="healthIssues" className="text-sm font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Health Issues (if any)
                  </Label>
                  <Textarea
                    id="healthIssues"
                    name="healthIssues"
                    value={student.healthIssues}
                    onChange={handleChange}
                    placeholder="Mention any health conditions, allergies, or medical requirements"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add Student
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStudents;
