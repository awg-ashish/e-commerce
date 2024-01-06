import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Trying to connect to : " + process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected successfully: ${conn.connection.host}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};
export default connectDB;
