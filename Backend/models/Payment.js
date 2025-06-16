import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentId: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "paid"],
      default: "created",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
