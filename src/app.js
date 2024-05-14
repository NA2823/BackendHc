import express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "10kb"}))

app.use(express.urlencoded({extended : true , limit : "10kb"}))

app.use(express.static('public'))

app.use(cookieParser())



// routes
import  userRouter from "./routes/user.router.js";

// route declaration
app.use('/api/v1/users', userRouter)

export {app}