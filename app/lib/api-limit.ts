
import prisma from "@/lib/prisma";
import { MAX_FREE_COUNT } from "@/constants";
import { getUserToken } from "../helpers/getUserToken";

export const increaseApiLimit = async () => {
    // const { userId } = auth();
    const session = await getUserToken() 

    if(!session?.user.id) {
        return;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid: session?.user.id
        }
    });

    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: {userid: session?.user.id},
            data: {tokensUsed: userApiLimit.tokensUsed + 1},
        });
    } else {
        await prisma.userApiLimit.create({
            data: { userid: session?.user.id, tokensUsed: 1 }
        });
    }
};

export const checkApiLimit = async () => {
    // const { userId } = auth();
    const session = await getUserToken() 
    if (!session?.user.id) {
        return false;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where : {
            userid: session?.user.id
        }
    });

    if (!userApiLimit || userApiLimit.tokensUsed < MAX_FREE_COUNT)
    {
        return true;
    } else {
        return false;
    }
};

export const getApiLimitCount = async () => {
    // return 0;

    // const { userId } = auth();

    // if(!userId)
    // {
    //     return 0
    // }
    

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid: 'clor740v70000mzwkpr3d6ehx' //userId
        }
    });

    if(!userApiLimit) {
        //Means user has never used any count
        return 0
    }

    return userApiLimit.tokensUsed;
}