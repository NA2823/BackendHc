import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        console.log(`mongodb connected successfull... HOST : ${mongoose.connection.host}`);

    } catch (error) {
        console.log("connection failed...",error);
        process.exit(0);
    }
}

export default connectDb