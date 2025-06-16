import ChatRoom from "../models/ChatRoom.js";
import Message from "../models/Message.js";

export const createRoom = async (req, res) => {
  const { name, participantIds } = req.body;
  if (!name || !participantIds?.length) return res.status(400).json({ message: "Name and participants required" });
  const room = await ChatRoom.create({ name, participants: participantIds });
  res.status(201).json(room);
};

export const getRooms = async (req, res) => {
  const rooms = await ChatRoom.find({ participants: req.user._id }).populate("participants", "name");
  res.json(rooms);
};

export const postMessage = async (req, res) => {
  const { roomId, content } = req.body;
  const room = await ChatRoom.findById(roomId);
  if (!room || !room.participants.includes(req.user._id)) return res.status(403).json({ message: "Not in room" });
  const msg = await Message.create({ room: roomId, sender: req.user._id, content });
  res.status(201).json(msg);
};

export const getMessages = async (req, res) => {
  const { roomId } = req.params;
  const room = await ChatRoom.findById(roomId);
  if (!room || !room.participants.includes(req.user._id)) return res.status(403).json({ message: "Not in room" });
  const messages = await Message.find({ room: roomId }).populate("sender", "name");
  res.json(messages);
};