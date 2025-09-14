import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log("✅ Connected to DB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // exit on failure
    }
};
