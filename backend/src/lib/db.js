import mongoose from "mongoose";

let cachedConnection = null;

export const connectDB = async () => {
  // Return cached connection if it exists
  if (cachedConnection) return cachedConnection;
  
  try {
    cachedConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${cachedConnection.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    // Don't use process.exit(1) in serverless - it kills the function
    throw error;
  }
};
