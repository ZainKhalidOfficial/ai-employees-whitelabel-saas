import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
import {SignJWT, jwtVerify} from 'jose';

export const getDataFromToken = async (request: NextRequest) => {
    try {

        const token = request.cookies.get("token")?. value || '';
    
        // const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const { payload, protectedHeader } = await jwtVerify(token , new TextEncoder().encode(process.env.JWT_SECRET!) )
       
        return {user:payload}; //decodedToken.id; currently returning whole token
        
    } catch (error: any) {

        // throw new Error(error.message);
        console.log("Error from lib/getDataFromToken : ",error)
        return null;
        
    }
}