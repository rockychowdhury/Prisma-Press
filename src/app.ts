import express, { Application } from "express";
import cors from "cors"
import config from "./config";
import cookieParser from "cookie-parser";
import status from "http-status";
import { userRoute } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoutes } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";


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

app.use('/api/users',userRoute);
app.use('/api/auth',authRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);

export default app;