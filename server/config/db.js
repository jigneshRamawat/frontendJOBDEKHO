import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.error('CRITICAL: MONGODB_URI environment variable is not defined.');
      process.exit(1);
    }

    console.log('Connecting to MongoDB database...');
    const conn = await mongoose.connect(connStr);
    
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
