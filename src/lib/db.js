import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mahidhar:Mahi985298@badcow.yxt8s.mongodb.net/badcowbadcow?retryWrites=true&w=majority&appName=badcow";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
