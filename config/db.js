// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" });

import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("env", process.env.MONGO_URI);

    console.log("Mongodb Connected");
  } catch (error) {
    throw new Error(error.message);
  }
}

export default connectDB;
