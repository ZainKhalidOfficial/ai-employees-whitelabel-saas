
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/app/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return new NextResponse("Missing required fields", { status: 400, statusText: "Missing required fields" });
        }

        //check if user already exists
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400, statusText: "User already exists" })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                domain: ''
            },

        });

        if(!newUser) {
            return NextResponse.json({ error: "Signup Failed! Username taken!" },
                { status: 500, statusText: "Signup Failed! Username taken!" })
        }

        //Send an email
        const getUser = await prisma.user.findUnique({
            where: { email }
        })

        const hostname = request.headers
            .get("host")!
            .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);


        await sendEmail({ email, emailType: "VERIFY", userId: getUser?.id, domain: hostname, userType: "USER" });


        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser
        });

    } catch (error: any) {
        console.log("Signup API Failed: ", error.message)
        return NextResponse.json({ error: error.message },
            { status: 500, statusText: error.message })
    }
}