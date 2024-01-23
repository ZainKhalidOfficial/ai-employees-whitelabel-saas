import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";
import { MAX_FREE_COUNT } from "@/constants";

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if(!userId) {
        return;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid: userId
        }
    });

    if (userApiLimit) {
        await prisma.userApiLimit.update({
            where: {userid: userId},
            data: {count: userApiLimit.count + 1},
        });
    } else {
        await prisma.userApiLimit.create({
            data: { userid: userId, count: 1 }
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where : {
            userid: userId
        }
    });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT)
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

    return userApiLimit.count;
}