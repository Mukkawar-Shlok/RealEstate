// db.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectToDatabase;
