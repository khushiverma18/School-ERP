import React, { useState } from 'react';
import { MessageSquare, Send, Users, Search, Bell } from 'lucide-react';
import useChat from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';

const ChatCenter = () => {
  const [message, setMessage] = useState('');
  const { user: currentUser } = useAuth();
  const {
    rooms,
    selectedRoom,
    setSelectedRoom,
    messages,
    sendMessage
  } = useChat();

  const send = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
          <p className="text-gray-600">Chat with students, teachers, and parents</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
          <Bell className="h-4 w-4" />
          <span>Send Announcement</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-full">
            {Array.isArray(rooms) && rooms.map((room) => (
              <div
                key={room._id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedRoom?._id === room._id ? 'bg-indigo-50 border-indigo-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      {room.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{room.name}</h4>
                      <p className="text-sm text-gray-500 truncate">
                        {room.participants.map(p => p.name).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  {selectedRoom.name}
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message._id} 
                    className={`flex ${message.sender._id === currentUser._id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender._id === currentUser._id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender._id === currentUser._id ? 'text-indigo-200' : 'text-gray-500'}`}>
                        {message.sender.name} • {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && send()}
                  />
                  <button
                    onClick={send}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCenter;