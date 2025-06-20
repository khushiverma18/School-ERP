import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const CHAT_STORAGE_KEY = 'school_chat';
const DEFAULT_ROLES = ['admin', 'teacher', 'parent', 'student'];
const GUEST_USER = { role: 'guest', name: 'Guest User' };

const roleDisplayMap = {
  admin: 'Admin User',
  teacher: 'Teacher User',
  parent: 'Parent User',
  student: 'Student User',
  guest: 'Guest User'
};

export default function useChat() {
  const { user: currentUser } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  // Generate chat rooms
  useEffect(() => {
    const userRole = currentUser?.role || 'guest';
    const userName = currentUser?.name || GUEST_USER.name;

    const otherRoles = DEFAULT_ROLES.filter(role => role !== userRole);

    const generatedRooms = otherRoles.map(role => {
      const roomId = [userRole, role].sort().join('-');
      return {
        _id: roomId,
        name: roleDisplayMap[role] || role,
        participants: [
          { _id: userRole, name: roleDisplayMap[userRole] || userName },
          { _id: role, name: roleDisplayMap[role] || role }
        ]
      };
    });

    setRooms(generatedRooms);
  }, [currentUser]);

  // Load messages for selected room
  useEffect(() => {
    if (!selectedRoom) {
      setMessages([]);
      return;
    }

    const chatData = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '{}');
    const roomMessages = chatData[selectedRoom._id] || [];

    const transformedMessages = roomMessages.map(msg => ({
      ...msg,
      _id: msg.timestamp + msg.sender,
      content: msg.message,
      createdAt: msg.timestamp,
      sender: {
        _id: msg.sender,
        name: roleDisplayMap[msg.sender] || msg.sender
      }
    }));

    setMessages(transformedMessages);
  }, [selectedRoom]);

  // Send message
  const sendMessage = useCallback((message) => {
    if (!selectedRoom || !message.trim()) return;

    const sender = currentUser?.role || 'guest';
    const senderName = currentUser?.name || GUEST_USER.name;

    const newMessage = {
      sender,
      message,
      timestamp: new Date().toISOString()
    };

    const chatData = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '{}');
    const roomMessages = chatData[selectedRoom._id] || [];
    const updatedMessages = [...roomMessages, newMessage];

    const updatedChatData = {
      ...chatData,
      [selectedRoom._id]: updatedMessages
    };

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedChatData));

    setMessages(prev => [
      ...prev,
      {
        ...newMessage,
        _id: newMessage.timestamp + newMessage.sender,
        content: newMessage.message,
        createdAt: newMessage.timestamp,
        sender: {
          _id: newMessage.sender,
          name: roleDisplayMap[newMessage.sender] || senderName
        }
      }
    ]);
  }, [selectedRoom, currentUser]);

  // Sync messages in real time (other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === CHAT_STORAGE_KEY && selectedRoom) {
        const chatData = JSON.parse(e.newValue || '{}');
        const roomMessages = chatData[selectedRoom._id] || [];

        const transformedMessages = roomMessages.map(msg => ({
          ...msg,
          _id: msg.timestamp + msg.sender,
          content: msg.message,
          createdAt: msg.timestamp,
          sender: {
            _id: msg.sender,
            name: roleDisplayMap[msg.sender] || msg.sender
          }
        }));

        setMessages(transformedMessages);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [selectedRoom]);

  return {
    rooms,
    selectedRoom,
    setSelectedRoom,
    messages,
    sendMessage
  };
}
