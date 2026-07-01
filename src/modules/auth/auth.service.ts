import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";


const login = async (payload:ILoginUser) =>{


    const {email, password }= payload;

    const user = await prisma.user.findUniqueOrThrow({
        where:{email}
    });

    if(user.activeStatus === "BLOCKED"){
        throw new Error("Your account has blocked! Please contact support.");
    }

    const isPasswordMatched = bcrypt.compare(password,user.password);

    if(!isPasswordMatched){
        throw new Error("Incorrect Password");
    }

    const jwtPayload = {
        id:user.id,
        email:user.email,
        role: user.role,
        name: user.name
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret, 
        config.jwt_access_expires_in as SignOptions
    );
    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret, 
        config.jwt_refresh_expires_in as SignOptions
    );

    return {accessToken,refreshToken}
}


export const authService ={
    login,
}