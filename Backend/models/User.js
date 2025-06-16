import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Enum jisme possible roles define kar diye
export const rolesEnum = ["admin", "teacher", "student", "parent"];

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: rolesEnum,
      default: "Student",
    },


  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;