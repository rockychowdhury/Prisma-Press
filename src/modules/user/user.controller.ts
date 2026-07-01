import { NextFunction, Request, RequestHandler, Response } from "express"
import { userService } from "./user.service";
import status from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { cacheAsync } from "../../utils/catchAsync";

const registerUser = cacheAsync(async (req: Request, res: Response, next: NextFunction) => {
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


const getMyProfile = cacheAsync(async (req: Request, res: Response, next: NextFunction) => {
    const profile = await userService.getMyProfileFromDB("1")
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



const updateMyProfile = async (req: Request, res: Response) => {

}




export const userController = {
    getMyProfile,
    registerUser,
    updateMyProfile
}