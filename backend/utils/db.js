import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongodbconnection = process.env.MONGODB_URI.toString().replace(
      '<PASSWORD>',
      process.env.MONGODB_PASSWORD
    );

    const conn = await mongoose.connect(mongodbconnection);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
