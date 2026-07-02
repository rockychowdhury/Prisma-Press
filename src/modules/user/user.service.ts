import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";
import config from "../../config";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique(
        {
            where: { email }
        }
    );
    // console.log(isUserExist);
    if (isUserExist) {
        throw new Error("User with this email already exist.");
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const createUser = await prisma.user.create(
        {
            data: {
                name,
                email,
                password: hashedPassword,
                profile: {
                    create: {
                        profilePhoto
                    }
                }
            }
        }
    )

    const user = await prisma.user.findUnique({
        where: {
            id: createUser.id,
            email: createUser.email || email
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })

    return user;
}


const getMyProfileFromDB = async (id: string) => {
    const user = await prisma.user.findUnique(
        {
            where:{id},
            omit:{password:true},
            include:{profile:true}
        }
    )

    return user;
}


const updateMyProfileInDB = async (id: string, payload: any) => {
    const {name, email, profilePhoto, bio} = payload;

    const updatedUser = await prisma.user.update({
        where:{id},
        data:{
            name,email,
            profile:{
                update:{
                    profilePhoto,
                    bio
                }
            }
        },
        omit:{password:true},
        include:{profile:true}
    });
    return updatedUser;
}

export const userService = {
    registerUserIntoDB,
    getMyProfileFromDB,
    updateMyProfileInDB
}