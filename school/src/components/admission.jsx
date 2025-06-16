import React, { useState } from 'react';
import { X, User, Phone, Mail } from 'lucide-react';
import emailjs from "@emailjs/browser";

const AdmissionForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    gender: "",
    parentPhone: "",
    address: "",
  });

  const [formStatus, setFormStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Match these keys with your EmailJS template variables
    const templateParams = {
      student_name: formData.studentName,
      student_email: formData.email,        // added email
      gender: formData.gender,
      contact_number: formData.parentPhone,
      address: formData.address,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormStatus("success");
      setFormData({
        studentName: "",
        email: "",
        gender: "",
        parentPhone: "",
        address: "",
      });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Student Information Form</h2>
          <button onClick={onClose} type="button" className="text-white hover:text-gray-200 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {formStatus === "success" && (
            <div className="text-green-600">Application submitted successfully!</div>
          )}
          {formStatus === "error" && (
            <div className="text-red-600">Submission failed. Please try again.</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                Student Full Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Contact No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-1" />
                Contact Number *
              </label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Address / Apply For */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address / Apply For *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className={`px-6 py-3 text-white rounded-lg transition-all duration-200 ${
                formStatus === "submitting"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
            >
              {formStatus === "submitting" ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
