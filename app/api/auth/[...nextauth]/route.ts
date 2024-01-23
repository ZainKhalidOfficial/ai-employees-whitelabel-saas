import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { type NextApiResponse, type NextApiRequest } from "next";

//Original
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// //Updated

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     return await NextAuth(req, res, authOptions(req));
//   };
  
//   export { handler as GET, handler as POST };