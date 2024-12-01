import mongoose from "mongoose";

export const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(URI);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
