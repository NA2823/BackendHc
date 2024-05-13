import { config } from "dotenv";
import connectDb from "./db/index.js";


config();


connectDb()