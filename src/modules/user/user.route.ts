import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

//create user
router.post("/",userController.registerUser);

//get user
router.get('/me',userController.getMyProfile);


//update user
router.put("/",userController.updateMyProfile);


export const userRoute = router;