import express from "express";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";
import razor from "../config/razorpayInstance.js"; // ✅ Using separated config

const router = express.Router();

// @route   POST /api/payments/create-order
// @desc    Parent creates a payment order for a student's fee
// @access  Protected, Parent only
router.post(
  "/create-order",
  protect,
  permit("Parent"),
  async (req, res) => {
    const { studentId, amount } = req.body;
    try {
      const student = await User.findById(studentId);
      if (!student || student.role !== "Student") {
        return res.status(404).json({ message: "Student not found" });
      }
      if (!req.user.children.includes(studentId)) {
        return res
          .status(403)
          .json({ message: "You are not parent of this student" });
      }

      const options = {
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };
      const order = await razor.orders.create(options);

      const payment = await Payment.create({
        parent: req.user._id,
        student: studentId,
        orderId: order.id,
        amount,
        status: "created",
      });

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        paymentId: order.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Could not create order" });
    }
  }
);

// @route   POST /api/payments/verify
// @desc    Verify payment signature and update status
// @access  Protected, Parent only
router.post("/verify", protect, permit("Parent"), async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    payment.paymentId = paymentId;
    payment.status = "paid";
    await payment.save();

    res.json({ message: "Payment verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
});

export default router;
