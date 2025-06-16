// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Handle missing URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable not defined');
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;