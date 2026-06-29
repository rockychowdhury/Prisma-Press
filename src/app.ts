import express, { Application } from "express";
import cors from "cors"
import config from "./config";
import cookieParser from "cookie-parser";
import status from "http-status";


const app:Application = express();

//middlewares
app.use(cors(
    {
        origin:config.app_url,
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(status.OK).send(
        {
            message:"Server is Healthy",
            from: "Prisma Press",
            author: "Rocky Chowdhury",
            time: new Date(),
        }
    )
})

export default app;