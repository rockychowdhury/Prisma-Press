import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";


const login = async (payload: ILoginUser) => {


    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    });

    if (user.activeStatus === "BLOCKED") {
        throw new Error("Your account has blocked! Please contact support.");
    }

    const isPasswordMatched = bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Incorrect Password");
    }

    const jwtPayload = {
        id: user.id,
        email: user.email,
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

    return { accessToken, refreshToken }
}



const refreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken,config.jwt_refresh_secret);
    if(!verifiedRefreshToken.success){
        throw new Error (verifiedRefreshToken.error);
    }

    const {id} = verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where:{id}
    });
    if(user.activeStatus === "BLOCKED"){
        throw new Error ("User is blocked");
    }

    const jwtPayload = {
        id,
        name:user.name,
        email:user.email,
        role: user.role
    }


    const accessToken = jwtUtils.createToken(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in as SignOptions)

    return {accessToken};
}


export const authService = {
    login,
    refreshToken
}