
import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
import { cookies } from "next/headers";

export const getUserToken = () => {
    try {

        const token = cookies().get("token")?. value || '';

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)
        // console.log(decodedToken);
        return {user:decodedToken}; //decodedToken.id;
        
    } catch (error: any) {

        console.log("Exception at getUserToken() : ",error.message);
        return null;
    }
}