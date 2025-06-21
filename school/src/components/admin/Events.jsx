import React, { useContext, useState, useRef } from 'react';
import {
  CalendarDays,
  Plus,
  Users,
  MapPin,
  Clock,
  Pencil,
  Trash2,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AppContext } from '@/context/contexts';

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
    if (!formData.title || !formData.date) return alert('Please fill in at least the title and date.');

    const newEvent = {
      ...formData,
      id: Date.now(),
      status: 'Upcoming',
      attendees: formData.attendees ? Number(formData.attendees) : 0,
    };

    addEvent(newEvent);
    setShowCreateForm(false);
    setFormData({ title: '', date: '', time: '', venue: '', coordinator: '', attendees: '', description: '' });
  };

  return (
    <div className="relative p-4 sm:p-6 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 min-h-screen overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-10 left-20 w-96 h-96 bg-fuchsia-400 opacity-20 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute top-1/2 right-20 w-80 h-80 bg-violet-400 opacity-15 rounded-full blur-2xl animate-bounce -z-10" />
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-300 opacity-10 rounded-full blur-2xl animate-ping -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Events Dashboard</h1>
            <p className="text-slate-500 mt-1">Create, manage, and track all school events.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="bg-fuchsia-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-fuchsia-700 transition-all duration-200 flex items-center space-x-2 font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Event</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-slate-800">New Event Details</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Event Title</label>
                  <input name="title" type="text" value={formData.title} onChange={handleChange} placeholder="e.g., Annual Sports Day" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition" />
                </div>
                <div><label className="text-sm font-medium text-slate-700">Date</label><input name="date" type="date" value={formData.date} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition" /></div>
                <div><label className="text-sm font-medium text-slate-700">Time</label><input name="time" type="time" value={formData.time} onChange={handleChange} className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition" /></div>
                <div><label className="text-sm font-medium text-slate-700">Venue</label><input name="venue" type="text" value={formData.venue} onChange={handleChange} placeholder="e.g., School Auditorium" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition" /></div>
                <div><label className="text-sm font-medium text-slate-700">Coordinator</label><input name="coordinator" type="text" value={formData.coordinator} onChange={handleChange} placeholder="e.g., Mr. Smith" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition" /></div>
                <div className="md:col-span-2"><label className="text-sm font-medium text-slate-700">Expected Attendees</label><input name="attendees" type="number" value={formData.attendees} onChange={handleChange} placeholder="e.g., 250" className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition" /></div>
                <div className="md:col-span-2"><label className="text-sm font-medium text-slate-700">Description</label><textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Briefly describe the event..." className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-fuchsia-400 focus:border-transparent transition"></textarea></div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreateForm(false)} className="px-5 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors">Cancel</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCreate} className="px-5 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 shadow-sm">Create Event</motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {events.length > 0 ? (
              events.map((event, index) => (
                <TiltCard key={event.id} event={event} index={index} deleteEvent={deleteEvent} />
              ))
            ) : (
              <motion.div className="md:col-span-2 lg:col-span-3 text-center py-20 px-6 bg-white rounded-xl shadow-lg border">
                <XCircle className="mx-auto h-16 w-16 text-slate-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-800">No Events Yet</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Click on "Create New Event" to get started and plan something amazing!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const TiltCard = ({ event, index, deleteEvent }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const glowX = useTransform(x, (v) => v * 100 + 50);
  const glowY = useTransform(y, (v) => v * 100 + 50);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative bg-pink-100 p-6 rounded-xl border shadow-xl transition-all"
    >
      <motion.div
        className="absolute -inset-4 rounded-xl pointer-events-none z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(176, 11, 93, 0.3), transparent 60%)`
          ),
          opacity: useTransform(y, [-0.5, 0.5], [0.4, 0.4]),
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{event.title}</h3>
        <div className="text-slate-500 text-sm space-y-1 mb-3">
          <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-fuchsia-500" /> {event.date}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-fuchsia-500" /> {event.time || '--'}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-fuchsia-500" /> {event.venue || '--'}</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-fuchsia-500" /> {event.attendees || 0} attendees</div>
        </div>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center text-sm text-slate-400">
          <span>By {event.coordinator || 'N/A'}</span>
          <div className="flex gap-2">
            <Pencil className="w-4 h-4 cursor-pointer hover:text-indigo-600" />
            <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500" onClick={() => deleteEvent(event.id)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventsManagement;
