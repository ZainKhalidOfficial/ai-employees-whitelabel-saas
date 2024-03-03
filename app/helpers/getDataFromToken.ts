import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
import {SignJWT, jwtVerify} from 'jose';
import { RequestCookies } from '@edge-runtime/cookies'

export const getDataFromToken = async (request: NextRequest) => {
    try {

        // const cookies = new RequestCookies(request.headers)

        const token = request.cookies.get("token")?. value;

        if(!token){
            console.log("Missing user token");
            return null;
        }

        console.log('verifying user in getDataFromToken(req)')

        // const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const verified = await jwtVerify(token , new TextEncoder().encode(process.env.JWT_SECRET!) )
        return verified.payload; //decodedToken.id; currently returning whole token
        
    } catch (error: any) {

        // throw new Error(error.message);
        console.log("Error from lib/getDataFromToken : ",error)
        return null;
        
    }
}

