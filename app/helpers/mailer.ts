import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'
import prisma from "@/lib/prisma";

export const sendEmail = async ({ email, emailType, userId, domain, userType }: any) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedToken = await bcryptjs.hash(userId.toString(), salt);

    const currentDateTime = new Date();
    const delayedDateTime = new Date(currentDateTime.getTime() + (3600000));

    if (userType === "TENANT") {
      if (emailType === "VERIFY") {
        await prisma.tenantUser.update({
          where: {
            id: userId,
          },
          data: {
            verifyToken: hashedToken,
            verifyTokenExpiry: delayedDateTime
          },
        })
      } else if (emailType === "RESET") {

        await prisma.tenantUser.update({
          where: {
            id: userId,
          },
          data: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: delayedDateTime
          },
        })
      }
    }
    else if (userType === "USER") {
      if (emailType === "VERIFY") {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            verifyToken: hashedToken,
            verifyTokenExpiry: delayedDateTime
          },
        })
      } else if (emailType === "RESET") {

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: delayedDateTime
          },
        })
      }
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a5115902e46571",
        pass: "2d043be4245844"
      }
    });
    //TODO: Add these to env.

    const mailOptions = {
      from: 'mzainkhalid922@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${domain}/verifyemail?token=${hashedToken}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the following link in your browser. <br> 
            ${domain}/verifyemail?token=${hashedToken} 
            </p>`
    }

    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
}