import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

//create user
router.post("/",userController.registerUser);

//get user
router.get('/me',auth(Role.ADMIN,Role.AUTHOR,Role.USER), userController.getMyProfile);


//update user
router.put("/",auth(Role.USER,Role.ADMIN,Role.AUTHOR),userController.updateMyProfile);


export const userRoute = router;