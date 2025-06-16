import { useState, useEffect, useContext } from 'react';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function useChat() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const { token } = useAuth();

  // Fetch user's chat rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/chat/rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  // Fetch room messages
  const fetchMessages = async (roomId) => {
    try {
      const res = await axios.get(`/api/chat/rooms/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // Send message
  const sendMessage = async (content) => {
    if (!selectedRoom || !content.trim()) return;
    
    try {
      await axios.post('/api/chat/rooms/message', {
        roomId: selectedRoom._id,
        content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.room === selectedRoom?._id) {
        setMessages(prev => [...prev, message]);
      }
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, selectedRoom]);

  // Join room when selected
  useEffect(() => {
    if (socket && selectedRoom) {
      socket.emit('joinRoom', { roomId: selectedRoom._id });
      fetchMessages(selectedRoom._id);
    }
  }, [socket, selectedRoom]);

  // Initial rooms fetch
  useEffect(() => {
    fetchRooms();
  }, []);

  return {
    rooms,
    selectedRoom,
    setSelectedRoom,
    messages,
    loading,
    sendMessage
  };
}