import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Avatar, AvatarFallback, AvatarImage
} from "@/components/ui/avatar";

import { 
  MessageSquare, Send, Phone, Video, 
  Bell, Calendar, Users, Mail, ChevronLeft, ChevronRight 
} from "lucide-react";
import useChat from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';

export function StudentCommunication({ isOpen, toggleSidebar }) {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
const { user: authUser } = useAuth();
const currentUser = authUser || { role: 'guest', name: 'Guest' };  const {
    rooms,
    selectedRoom,
    setSelectedRoom,
    messages,
    sendMessage
  } = useChat();

  const send = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  // Mock data for other sections
  const announcements = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      content: "Get ready for our Annual Sports Day on March 25th, 2024. All students are encouraged to participate in various events.",
      author: "Principal Office",
      date: "2024-03-15",
      priority: "high",
      category: "Event"
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      "high": "bg-red-100 text-red-800 border-red-300",
      "medium": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "low": "bg-green-100 text-green-800 border-green-300"
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 min-h-screen">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-purple-100 hover:text-purple-700 transition-colors"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Communication 💬
          </h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="meetings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Meetings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    onClick={() => setSelectedRoom(room)}
                    className="p-3 rounded-lg hover:bg-purple-50 cursor-pointer border border-purple-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {room.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-800 truncate">{room.name}</h4>
                        <p className="text-sm text-gray-600 truncate">
                          {room.participants.map(p => p.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              {selectedRoom ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {selectedRoom.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-800">{selectedRoom.name}</h3>
                          <p className="text-sm text-green-600">Online</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Messages */}
                    <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                      {messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${message.sender._id === currentUser.role ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender._id === currentUser.role
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                                : 'bg-gray-100 text-gray-800 border border-purple-200'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender._id === currentUser.role ? 'text-purple-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && send()}
                        className="flex-1 border-purple-200 focus:border-purple-400"
                      />
                      <Button 
                        onClick={send}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center h-64">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">Select a conversation</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        {/* ... (other tabs remain the same) */}
      </Tabs>
    </div>
  );
}