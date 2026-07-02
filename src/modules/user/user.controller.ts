import { NextFunction, Request, RequestHandler, Response } from "express"
import { userService } from "./user.service";
import status from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = userService.registerUserIntoDB(payload);
    sendResponse(res,
        {
            success: true,
            statusCode: status.CREATED,
            message: "User created successfully",
            data: {
                user
            }
        })
}
)


// const userprofile = async (req: Request, res: Response) => {
//     return res.send({})
// };


const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const profile = await userService.getMyProfileFromDB(req.user?.id as string)
    sendResponse(res,
        {
            success: true,
            statusCode: status.OK,
            message: "profile fetched successfully",
            data: {
                profile
            }
        }
    )
})



const updateMyProfile = catchAsync(async (req: Request, res: Response, next:NextFunction)=>{
    const userId = req.user?.id as string;
    const payload = req.body;

    const updatedUser =await userService.updateMyProfileInDB(userId, payload);

    sendResponse(res,{
        success:true,
        statusCode:status.OK,
        message:"Profile Updated successfull",
        data:{
            updatedUser
        }
    })
})


export const userController = {
    getMyProfile,
    registerUser,
    updateMyProfile
}