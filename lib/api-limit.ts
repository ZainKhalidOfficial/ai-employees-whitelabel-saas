import prisma from "@/lib/prisma";
import { MAX_FREE_COUNT } from "@/constants";
import { cookies } from "next/headers";
import  jwt  from "jsonwebtoken";
import { getUserToken } from "@/app/helpers/getUserToken";

export const increaseApiLimit = async (type: string) => {


    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception increaseApiLimit function: ",error);
        return;
      
    }


    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid: decodedToken.id
        }
    });

    if (userApiLimit) {

            switch (type) {
                case 'tokens':
                    await prisma.userApiLimit.update({
                        where: {userid: decodedToken.id},
                        data: {tokensUsed: userApiLimit.tokensUsed + 1},
                    });
                    
                    break;
                case 'businessProfiles':
                    await prisma.userApiLimit.update({
                        where: {userid: decodedToken.id},
                        data: {businessProfilesUsed: userApiLimit.businessProfilesUsed + 1},
                    });

                    break;
                case 'customEmployees':
                    await prisma.userApiLimit.update({
                        where: {userid: decodedToken.id},
                        data: {customEmployeesUsed: userApiLimit.customEmployeesUsed + 1},
                    });
                    
                    break;
                default:
                    console.log('Invalid apiIncreaseLimit (Type) Reached @lib/api-limit.ts ')
                    break;
            }
        
   
    } else {


        switch (type) {
            case 'tokens':
                await prisma.userApiLimit.create({
                    data: { userid: decodedToken.id, tokensUsed: 1 }
                });
                
                break;
            case 'businessProfiles':
                await prisma.userApiLimit.create({
                    data: { userid: decodedToken.id, businessProfilesUsed: 1 }
                });

                break;
            case 'customEmployees':
                await prisma.userApiLimit.create({
                    data: { userid: decodedToken.id, customEmployeesUsed: 1 }
                });   
                             
                break;
            default:
                console.log('Invalid apiIncreaseLimit (Type) Reached @lib/api-limit.ts ')
                break;
        }

    }
};

export const decreaseApiLimit = async (type: string) => {


    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception increaseApiLimit function: ",error);
        return;
      
    }


    const userApiLimit = await prisma.userApiLimit.findUnique({
        where: {
            userid: decodedToken.id
        }
    });

    if (userApiLimit) {

            switch (type) {
                // case 'tokens':
                //     await prisma.userApiLimit.update({
                //         where: {userid: decodedToken.id},
                //         data: {tokensUsed: userApiLimit.tokensUsed - 1},
                //     });
                    
                //     break;
                case 'businessProfiles':
                    await prisma.userApiLimit.update({
                        where: {userid: decodedToken.id},
                        data: {businessProfilesUsed: userApiLimit.businessProfilesUsed - 1},
                    });

                    break;
                case 'customEmployees':
                    await prisma.userApiLimit.update({
                        where: {userid: decodedToken.id},
                        data: {customEmployeesUsed: userApiLimit.customEmployeesUsed - 1},
                    });
                    
                    break;
                default:
                    console.log('Invalid decreaseApiLimit (Type) Reached @lib/api-limit.ts ')
                    break;
            }
    }
};

export const checkApiLimit = async () => {

    let decodedToken: any = "";

    try {
        const token = cookies().get('token')?. value || '';

        decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception checkapilimit function: ",error);
        return false;
        // router.push("/login");
    }

    const userApiLimit = await prisma.userApiLimit.findUnique({
        where : {
            userid: decodedToken.id
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

    let decodedToken: any = "";
    let userApiLimit: any = null;
    try {

        decodedToken = await getUserToken();

        userApiLimit = await prisma.userApiLimit.findUnique({
            where: {
                userid: decodedToken.user.id
            }
        });
    
    } catch (error) { 
        console.log("Custom Auth actually failed at exception getApiLimitCount function: ",error);
        return { tokensUsed:0, businessProfilesUsed:0 ,customEmployeesUsed:0 };
    } 

    if(!userApiLimit) {
        //Means user has never used any count
        return { tokensUsed:0, businessProfilesUsed:0 ,customEmployeesUsed:0 };
    }

    return { tokensUsed: userApiLimit.tokensUsed, businessProfilesUsed:userApiLimit.businessProfilesUsed ,customEmployeesUsed:userApiLimit.customEmployeesUsed }; //userApiLimit.tokensUsed;
}