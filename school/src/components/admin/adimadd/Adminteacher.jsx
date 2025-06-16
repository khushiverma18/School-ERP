import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/contexts';
import { GraduationCap, Mail, Phone, Calendar, MapPin, User, IdCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AdminTeacher = () => {
  const { addTeacher } = useContext(AppContext);
  const { toast } = useToast();

  const [teacher, setTeacher] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    dateOfJoining: new Date().toISOString().slice(0, 10),
    qualifications: '',
    employeeId: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!teacher.name.trim()) newErrors.name = 'Name is required';
    if (!teacher.subject.trim()) newErrors.subject = 'Subject is required';
    if (!teacher.email.trim()) newErrors.email = 'Email is required';

    if (teacher.email && !/^\S+@\S+\.\S+$/.test(teacher.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (teacher.phone && !/^\d{10}$/.test(teacher.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setTeacher(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    const newTeacher = {
      id: Date.now().toString(),
      ...teacher,
    };

    addTeacher(newTeacher);

    toast({
      title: "Success",
      description: `Teacher "${teacher.name}" has been added successfully!`,
    });

    // Reset form
    setTeacher({
      name: '',
      subject: '',
      email: '',
      phone: '',
      dateOfJoining: new Date().toISOString().slice(0, 10),
      qualifications: '',
      employeeId: '',
      address: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8" />
              Add New Teacher
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={teacher.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter teacher's full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Primary Subject *
                  </Label>
                  <Input
                    id="subject"
                    value={teacher.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="e.g., Mathematics, Physics"
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={teacher.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="teacher@school.edu"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={teacher.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="text-sm font-medium flex items-center gap-2">
                    <IdCard className="h-4 w-4" />
                    Employee ID
                  </Label>
                  <Input
                    id="employeeId"
                    value={teacher.employeeId}
                    onChange={(e) => handleChange('employeeId', e.target.value)}
                    placeholder="e.g., TCH-001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfJoining" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date of Joining
                  </Label>
                  <Input
                    id="dateOfJoining"
                    type="date"
                    value={teacher.dateOfJoining}
                    onChange={(e) => handleChange('dateOfJoining', e.target.value)}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="qualifications" className="text-sm font-medium">
                    Qualifications
                  </Label>
                  <Textarea
                    id="qualifications"
                    value={teacher.qualifications}
                    onChange={(e) => handleChange('qualifications', e.target.value)}
                    placeholder="e.g., M.Sc. in Mathematics, B.Ed."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    value={teacher.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold"
                >
                  Add Teacher
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTeacher;
