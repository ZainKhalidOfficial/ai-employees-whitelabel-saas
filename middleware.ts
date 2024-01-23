import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from 'next/headers';
import { getDataFromToken } from "./app/helpers/getDataFromToken";
import  jwt  from "jsonwebtoken";
import {SignJWT, jwtVerify} from 'jose';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
     "/((?!api/|api/webhook/|_next/|_static/|_vercel|images/|[\\w-]+\\.\\w+).*)"

  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  
  
  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    
  //  const session = await getToken({ req });
      const session = await getDataFromToken(req);
      
    if (!session && !(path == "/login" || path == "/signup")) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && (path == "/login" || path == "/signup")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
    
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route

  // const session = await getToken({ req });
  
    const token = req.cookies.get('token')?.value || '';
    let decodedToken: any = "";


    try {
        // decodedToken = jwt.verify(token , process.env.JWT_SECRET!)
        decodedToken = await jwtVerify(token , new TextEncoder().encode(process.env.JWT_SECRET!) )
        // console.log("data : ", decodedToken.id);
    
    } catch (error) { 
        console.log("Custom Auth failed exception @ middleware: ",error);

        if ( path == "/login" || path == "/signup" || path ==  "/") {
          const response = NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));

           //encrypt domainName
           const encryptedHostname = await new SignJWT({ hostname: hostname }).setProtectedHeader({ alg: 'HS256' }).sign(new TextEncoder().encode(process.env.JWT_SECRET!))
           response.cookies.set("domainParams",encryptedHostname);

          return response;
        } 
        else {
          const response = NextResponse.rewrite(new URL(`/${hostname}/login`, req.url));

           //encrypt domainName
           const encryptedHostname = await new SignJWT({ hostname: hostname }).setProtectedHeader({ alg: 'HS256' }).sign(new TextEncoder().encode(process.env.JWT_SECRET!))
           response.cookies.set("domainParams",encryptedHostname);

          return response;
        }

        
        // router.push("/login");
    }

  if (token && (path == "/login" || path == "/signup" || path ==  "/")) {
    return NextResponse.redirect(new URL(`/${hostname}/dashboard`, req.url));
  } 

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}




