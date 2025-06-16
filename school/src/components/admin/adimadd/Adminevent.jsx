import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Clock, Star, Trophy, BookOpen, Palette } from 'lucide-react';
import { AppContext } from '../../../context/contexts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AdminEvents = () => {
  const { events, addEvent } = useContext(AppContext);
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('academic');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !description) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      date,
      description,
      type,
    };

    addEvent(newEvent);
    setTitle('');
    setDate('');
    setDescription('');
    setType('academic');
    setShowForm(false);

    toast({
      title: 'Event Added',
      description: `${title} has been scheduled for ${date}`,
    });
  };

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'academic': return <BookOpen className="h-5 w-5" />;
      case 'sports': return <Trophy className="h-5 w-5" />;
      case 'cultural': return <Palette className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const getEventColor = (eventType) => {
    switch (eventType) {
      case 'academic': return 'from-blue-500 to-blue-600';
      case 'sports': return 'from-green-500 to-green-600';
      case 'cultural': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto space-y-8">

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            🎉 School Events Management
          </h1>
          <p className="text-muted-foreground text-lg">Organize and manage all school activities</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Events', value: events.length, icon: <Calendar className="h-12 w-12 text-blue-200" />, color: 'from-blue-500 to-blue-600' },
            { label: 'Upcoming', value: upcomingEvents.length, icon: <Clock className="h-12 w-12 text-green-200" />, color: 'from-green-500 to-green-600' },
            { label: 'Academic', value: events.filter(e => e.type === 'academic').length, icon: <BookOpen className="h-12 w-12 text-purple-200" />, color: 'from-purple-500 to-purple-600' },
            { label: 'Sports & Cultural', value: events.filter(e => ['sports', 'cultural'].includes(e.type)).length, icon: <Trophy className="h-12 w-12 text-orange-200" />, color: 'from-orange-500 to-orange-600' },
          ].map((card, index) => (
            <Card key={index} className={`bg-gradient-to-br ${card.color} text-white border-0 shadow-lg`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">{card.label}</p>
                    <p className="text-3xl font-bold">{card.value}</p>
                  </div>
                  {card.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Event
          </Button>
        </div>

        {/* Add Event Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Plus className="h-5 w-5" /> Create New Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input id="title" type="text" placeholder="Enter event title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date</Label>
                      <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger><SelectValue placeholder="Select event type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        placeholder="Enter event description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full min-h-[100px] p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-4 justify-end">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                      <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                        Add Event
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TODO: Add Event List Rendering Here */}
      </motion.div>
    </div>
  );
};

export default AdminEvents;
