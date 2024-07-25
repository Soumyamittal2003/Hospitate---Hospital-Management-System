import express from "express";

import cors from "cors";

import {config} from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import messageRouter from "./router/messageRouter.js"
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointmentRouter.js"

const app =express();
config({path: "./config/config.env"})

//--------middlewares--------//

//connecting frontend & backend
app.use(
    cors({
        origin:[process.env.FRONTEND_URL, process.env.DASHBORD_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)


//Routes
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

//connection DataBase
dbConnection();




app.use(errorMiddleware);
export default app;