import { prisma } from "../../lib/prisma"


const createCheckOutSession = async (userId: string) => {
    const txResult = await prisma.$transaction(
        async (tx) => {
            const user = await tx.user.findUniqueOrThrow(
                {
                    where: { id: userId },
                    include:{
                        subscription:true
                    }
                },
            );

            // let stripeCustomerId = user.s
        }
    )
}


export const subscriptionService = {
    createCheckOutSession,
}