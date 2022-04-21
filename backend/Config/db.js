import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, () =>
      console.log("\x1b[36m%s\x1b[0m", "MongoDB Connected")
    );
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "Could not connect to MongoDB...");
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
