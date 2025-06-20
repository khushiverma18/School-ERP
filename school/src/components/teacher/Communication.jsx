import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Phone, Video, MoreVertical, Search, Paperclip } from 'lucide-react';
import useChat from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';

const Communications = () => {
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.participants.some(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="h-[calc(100vh-12rem)]">
      {/* Mobile View */}
      <div className="lg:hidden">
        {!selectedRoom ? (
          <MobileConversationList 
            rooms={filteredRooms}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectRoom={setSelectedRoom}
          />
        ) : (
          <MobileChatView
            room={selectedRoom}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={send}
            onBack={() => setSelectedRoom(null)}
            messagesEndRef={messagesEndRef}
            formatTime={formatTime}
            currentUser={currentUser}
          />
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Communications</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredRooms.map((room) => (
              <div
                key={room._id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedRoom?._id === room._id ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-white">{room.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 text-sm">{room.name}</p>
                    </div>
                    <p className="text-sm text-gray-700 truncate">
                      {room.participants.map(p => p.name).join(', ')}
                    </p>
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
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{selectedRoom.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedRoom.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedRoom.participants.map(p => p.name).join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${message.sender._id === currentUser.role ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender._id === currentUser.role
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender._id === currentUser.role ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && send()}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={send}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mobile Components
const MobileConversationList = ({ rooms, searchTerm, setSearchTerm, onSelectRoom }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {rooms.map((room) => (
        <div
          key={room._id}
          onClick={() => onSelectRoom(room)}
          className="p-4 active:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">{room.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">{room.name}</p>
              </div>
              <p className="text-sm text-gray-600">
                {room.participants.map(p => p.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MobileChatView = ({ 
  room, 
  messages, 
  newMessage, 
  setNewMessage, 
  onSendMessage, 
  onBack, 
  messagesEndRef, 
  formatTime,
  currentUser
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
    <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
      <button onClick={onBack} className="text-blue-600">
        ← Back
      </button>
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-sm font-medium text-white">{room.name.charAt(0)}</span>
      </div>
      <div>
        <p className="font-medium text-gray-900">{room.name}</p>
      </div>
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((message) => (
        <div key={message._id} className={`flex ${message.sender._id === currentUser.role ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs px-3 py-2 rounded-lg ${
            message.sender._id === currentUser.role ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="text-sm">{message.content}</p>
            <p className={`text-xs mt-1 ${message.sender._id === currentUser.role ? 'text-blue-100' : 'text-gray-500'}`}>
              {formatTime(message.createdAt)}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
    
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSendMessage}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default Communications;