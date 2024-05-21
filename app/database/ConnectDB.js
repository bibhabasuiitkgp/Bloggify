import mongoose from "mongoose";

// Retrieve the MongoDB URI from the environment variables
const uri = process.env.MONGODB_URI;

// Connect to the MongoDB database
const connectDB = async () => {
    if (mongoose.connection._readyState) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
