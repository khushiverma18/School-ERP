import React, { useState } from "react";
import { Mail, User, Phone, Calendar, X } from "lucide-react";

const BookDemoForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Request Submitted:", formData);
    alert("Your demo request has been submitted!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      message: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          📘 Book a Free Demo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2">
            <User className="text-purple-600 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2">
            <Mail className="text-purple-600 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2">
            <Phone className="text-purple-600 mr-3" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Preferred Date */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2">
            <Calendar className="text-purple-600 mr-3" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="Write a message (optional)"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none resize-none"
            rows={3}
          />

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDemoForm;
