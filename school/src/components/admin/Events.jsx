import React, { useContext, useState } from 'react';
import { CalendarDays, Plus, Users, MapPin, Clock } from 'lucide-react';
import { AppContext } from '@/context/contexts'; // Adjust path accordingly

const EventsManagement = () => {
  const { events, addEvent, deleteEvent } = useContext(AppContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    coordinator: '',
    attendees: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!formData.title || !formData.date) return alert('Fill all fields');

    const newEvent = {
      ...formData,
      id: Date.now(),
      status: 'Upcoming',
      attendees: Number(formData.attendees),
    };

    addEvent(newEvent);
    setShowCreateForm(false);
    setFormData({
      title: '',
      date: '',
      time: '',
      venue: '',
      coordinator: '',
      attendees: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Events Management 🗓️</h2>
          <p className="text-gray-600">Create and manage school events</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Event</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Event Title', name: 'title', type: 'text', placeholder: 'Enter event title' },
              { label: 'Date', name: 'date', type: 'date' },
              { label: 'Time', name: 'time', type: 'time' },
              { label: 'Venue', name: 'venue', type: 'text', placeholder: 'Event venue' },
              { label: 'Coordinator', name: 'coordinator', type: 'text', placeholder: 'Coordinator Name' },
              { label: 'Expected Attendees', name: 'attendees', type: 'number', placeholder: 'Number of attendees' },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Event description"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Create Event
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                event.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>{event.status}</span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <Users className="h-4 w-4" />
                <span>{event.attendees} attendees</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{event.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">By {event.coordinator}</span>
              <div className="flex space-x-2">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">Edit</button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsManagement;
