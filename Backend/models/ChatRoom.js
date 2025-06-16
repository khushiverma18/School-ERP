import mongoose from "mongoose";
const ChatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });
export default mongoose.model("ChatRoom", ChatRoomSchema);
